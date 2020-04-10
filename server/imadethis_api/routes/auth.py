from flask import Blueprint, jsonify, Response, request
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_raw_jwt,
    get_jwt_identity
)
from imadethis_api.services import auth
from imadethis_api.services.users import get_user_by_id
from imadethis_api.validation.auth import validate_auth_user


bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=['POST'])
def register() -> Response:
    username, password = validate_auth_user(request.get_json())
    user = auth.create_user(username, password)

    return jsonify({'success': bool(user)})


@bp.route('/login', methods=['POST'])
def login() -> Response:
    username, password = validate_auth_user(request.get_json())
    user = auth.login_user(username, password)
    token = create_access_token(identity=user.jwt_identity())

    return jsonify({'accessToken': token})


@bp.route('/active_user', methods=['GET'])
@jwt_required
def get_active_user() -> Response:
    identity = get_jwt_identity()
    user = get_user_by_id(identity['unique_id'])

    return jsonify(user.dto())


@bp.route('/logout', methods=['POST'])
@jwt_required
def logout() -> Response:
    identity = get_jwt_identity()
    token = get_raw_jwt()
    auth.blacklist_jwt(token['jti'], identity['unique_id'])

    return jsonify({'success': True})
