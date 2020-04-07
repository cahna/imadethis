from flask.testing import FlaskClient
from .shared.request import auth_header
from .shared.response import verify_error_response
from .shared.auth import (
    verify_register_user,
    verify_login_user,
    verify_get_active_user,
    verify_logout_user,
)


def test_get_existing_user(client: FlaskClient):
    username = 'abc123'
    password = 'P4ssW0rD:D'
    verify_register_user(client, username, password)
    access_token = verify_login_user(client, username, password)
    verify_get_active_user(client, access_token, username)


def test_register_then_actions_then_logout(client: FlaskClient):
    # Register a new user
    username = 'JonathanMoffett'
    password = '$ugarfoot'
    verify_register_user(client, username, password)
    access_token = verify_login_user(client, username, password)

    # Perform actions with valid token
    verify_get_active_user(client, access_token, username)
    verify_get_active_user(client, access_token, username)

    # Logout
    verify_logout_user(client, access_token)

    # Attempt action with same token (should fail)
    response = client.get(f'/users/active_user',
                          headers=auth_header(access_token),
                          follow_redirects=False)
    verify_error_response(response, 401)
