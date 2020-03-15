from flask import Blueprint, jsonify, Response
from .models import db


bp = Blueprint('health', __name__, url_prefix='/health')


@bp.route('', methods=['GET'])
def healthcheck() -> Response:
    status_code = 200
    healthy = True
    details = ''

    try:
        db.session.execute('SELECT 1')
    except Exception as e:
        details = str(e)
        status_code = 500

    return jsonify({'healthy': healthy, 'details': details}), status_code

