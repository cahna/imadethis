from typing import Mapping
from flask import Blueprint, request, abort, jsonify, Response
# from werkzeug.exceptions import HTTPException
from .models import db, User, Thread, ThreadMembership, ThreadMessage


bp = Blueprint('thread', __name__, url_prefix='/thread')


# @bp.errorhandler(HTTPException)
# def bad_request(error):
#    return jsonify({'error': error.description}), error.code


def valid_create_thread_request(data) -> bool:
    """Verify schema of data for create_thread request"""
    if not data or not isinstance(data, Mapping):
        return False
    if 'users' not in data:
        return False
    if len(data['users']) < 1:
        return False
    if not all(isinstance(u, str) for u in data['users']):
        return False
    if any(len(u) >= 64 or len(u) < 1 for u in data['users']):
        return False
    return len(set(data['users'])) == len(data['users'])  # No duplicates


@bp.route('', methods=['POST'])
def create_thread() -> Response:
    data = request.get_json()

    if not valid_create_thread_request(data):
        abort(400)

    thread = Thread()
    db.session.add(thread)

    new_users = []
    existing_users = db.session.query(User) \
                               .filter(User.username.in_(data['users'])).all()
    existing_usernames = [u.username for u in existing_users]

    if len(existing_users) != len(data['users']):  # Add new users to DB
        new_users = [User(username=u) for u in data['users']
                     if u not in existing_usernames]

        for u in new_users:
            db.session.add(u)

        db.session.commit()

    for u in existing_users + new_users:  # Add users to thread
        membership = ThreadMembership(thread=thread, user=u)
        db.session.add(membership)

    db.session.commit()

    return jsonify({'thread_id': thread.id})


@bp.route('/<int:thread_id>', methods=['GET'])
def get_thread(thread_id: int) -> Response:
    thread = Thread.query.filter_by(id=thread_id).first()

    if not thread:
        abort(400)

    return jsonify({
        'messages': [{
            'username': m.username,
            'message': m.message
        } for m in thread.messages],
    })


def valid_send_message_request(data) -> bool:
    """Verify schema of data for send_message request"""
    if not data or not isinstance(data, Mapping):
        return False
    if 'message' not in data or not isinstance(data['message'], str):
        return False
    return True


@bp.route('/<int:thread_id>/<string:username>', methods=['POST'])
def send_message(thread_id: int, username: str) -> Response:
    thread = Thread.query.filter_by(id=thread_id).first()

    if not thread:
        abort(400)

    if username not in [u.username for u in thread.members]:
        abort(401)

    data = request.get_json()

    if not valid_send_message_request(data):
        abort(400)

    message = ThreadMessage(thread=thread,
                            username=username,
                            message=data['message'])
    db.session.add(message)
    db.session.commit()

    return jsonify({}), 204

