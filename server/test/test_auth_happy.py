from flask.testing import FlaskClient
from .shared.auth import (
    verify_register_user,
    verify_logout_user,
    verify_login_user,
)


def test_register_user(client: FlaskClient):
    username = 'abcdefghijklmnopqrstuvwxyz'
    password = '*0123456789_ABCDEF#'
    verify_register_user(client, username, password)


def test_register_login_logout(client: FlaskClient):
    username = 'Steve_Lukath3r'
    password = 'Never Walk Alone'
    verify_register_user(client, username, password)
    access_token = verify_login_user(client, username, password)
    verify_logout_user(client, access_token)


def test_logout_then_login_gives_new_token(client: FlaskClient):
    username = 'TigerKing'
    password = 'T.B. Carole Baskin'
    verify_register_user(client, username, password)
    access_token1 = verify_login_user(client, username, password)
    verify_logout_user(client, access_token1)
    access_token2 = verify_login_user(client, username, password)

    assert access_token1 != access_token2, \
        'Should have received a new token'
