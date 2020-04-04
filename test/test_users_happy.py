from __future__ import annotations
from flask.testing import FlaskClient
from .shared import verify_register_user, verify_get_active_user


def test_get_existing_user(client: FlaskClient):
    username = 'abc123'
    password = 'P4ssW0rD:D'
    data = verify_register_user(client, username, password)
    verify_get_active_user(client, data.get('access_token'), username)
