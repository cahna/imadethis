from flask import Blueprint, jsonify, Response, request
from flask_jwt_extended import create_access_token, jwt_required
from imadethis_api.services.users import create_user
from imadethis_api.validation.users import validate_create_user


bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=['POST'])
def register() -> Response:
    username, password = validate_create_user(request.get_json())
    user = create_user(username, password)
    token = create_access_token(identity=user.jwt_identity())

    return jsonify(access_token=token)


@bp.route('/login', methods=['POST'])
def login() -> Response:
    return jsonify(dict(TODO=True))


@bp.route('/logout', methods=['POST'])
@jwt_required
def logout() -> Response:
    return jsonify(dict(TODO=True))
