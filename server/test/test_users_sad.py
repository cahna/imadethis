from __future__ import annotations
from werkzeug.exceptions import NotFound
from flask.testing import FlaskClient
from .shared import verify_error_response


def test_get_user_not_exists(client: FlaskClient):
    response = client.get(f'/users/IDoNotExist', follow_redirects=True)
    verify_error_response(response, 404, NotFound.description)


def test_get_active_user_no_auth(client: FlaskClient):
    response = client.get(f'/users/active_user', follow_redirects=True)
    verify_error_response(response, 401, 'Missing Authorization Header')
