from flask.testing import FlaskClient
from .shared import (
    verify_register_user,
    verify_logout_user,
    verify_login_user,
)


def test_register_user(client: FlaskClient):
    username = 'abcdefghijklmnopqrstuvwxyz'
    password = '*0123456789_ABCDEF#'
    verify_register_user(client, username, password)


def test_register_logout_login(client: FlaskClient):
    username = 'Steve_Lukath3r'
    password = 'Never Walk Alone'
    data_register = verify_register_user(client, username, password)
    register_token = data_register.get('access_token')

    verify_logout_user(client, register_token)

    data_login = verify_login_user(client, username, password)
    login_token = data_login.get('access_token')

    assert login_token != register_token, \
        'Should have received a new token'
