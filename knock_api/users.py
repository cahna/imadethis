from typing import Mapping
from flask import Blueprint, abort, jsonify, Response
from .models import User


bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/<string:username>', methods=['GET'])
def get_user_threads(username: str) -> Response:
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({
            'error': f'No such user: "{username}"',
        }), 404

    return jsonify({
        'username': user.username,
        'threads': [m.thread_id for m in user.belongs_to],
    })

