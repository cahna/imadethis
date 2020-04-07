from typing import Mapping
from flask.testing import FlaskClient
from .constants import JWT_TOKEN_NAME
from .request import auth_header
from .response import (
    verify_api_response, verify_user_response
)


def verify_register_user(client: FlaskClient,
                         username: str,
                         password: str):
    payload = dict(username=username, password=password)
    response = client.post('/auth/register',
                           json=payload,
                           follow_redirects=True)
    data = verify_api_response(response)

    assert 'success' in data
    assert data.get('success') is True


def verify_login_user(client: FlaskClient,
                      username: str,
                      password: str) -> str:
    payload = dict(username=username, password=password)
    response = client.post('/auth/login',
                           json=payload,
                           follow_redirects=True)
    data = verify_api_response(response)

    assert JWT_TOKEN_NAME in data, 'Missing token in response'
    token = data.get(JWT_TOKEN_NAME)
    assert isinstance(token, str) and len(token) > 1, \
        f'Invalid token in response: {token}'

    return token


def verify_logout_user(client: FlaskClient,
                       access_token: str):
    response = client.post(f'/auth/logout',
                           headers=auth_header(access_token),
                           follow_redirects=True)
    data = verify_api_response(response)

    assert 'success' in data
    assert data.get('success') is True
    assert JWT_TOKEN_NAME not in data


def verify_get_active_user(client: FlaskClient,
                           access_token: str,
                           username: str = None) -> Mapping:
    assert access_token

    response = client.get(f'/users/active_user',
                          headers=auth_header(access_token),
                          follow_redirects=False)

    return verify_user_response(response, username=username)
