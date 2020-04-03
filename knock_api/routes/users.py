from flask import Blueprint, jsonify, Response, request
from knock_api.models import User
from knock_api.controllers.users import create_user, get_user_by_username
from knock_api.controllers.validation.users import validate_create_user


bp = Blueprint('users', __name__, url_prefix='/users')


def user_resource(user: User) -> Response:
    return jsonify(user.as_dict())


@bp.route('/create', methods=['POST'])
def route_create_user() -> Response:
    username, password = validate_create_user(request.get_json())
    user = create_user(username, password)

    return user_resource(user)


@bp.route('/<string:username>', methods=['GET'])
def route_get_user_info(username: str) -> Response:
    user = get_user_by_username(username)

    return user_resource(user)

