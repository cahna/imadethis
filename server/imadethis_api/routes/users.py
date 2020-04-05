from flask import Blueprint, jsonify, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from imadethis_api.services.users import get_user_by_id
# from imadethis_api.exceptions.auth import ActionForbidden


bp = Blueprint('users', __name__, url_prefix='/users')


@bp.route('/active_user', methods=['GET'])
@jwt_required
def get_active_user() -> Response:
    identity = get_jwt_identity()
    user = get_user_by_id(identity['unique_id'])

    return jsonify(user.dto())

