from __future__ import annotations
from flask.testing import FlaskClient
from .shared import verify_create_user, verify_error_response


def test_create_user_bad_request(client: FlaskClient):
    response = client.post('/users/create', follow_redirects=True)
    verify_error_response(response, 400, 'Bad request')


def test_create_user_missing_password(client: FlaskClient):
    response = client.post('/users/create',
                           json=dict(username='ForgotAPassword'),
                           follow_redirects=True)
    verify_error_response(response, 400, 'Invalid password')


def test_create_user_missing_username(client: FlaskClient):
    response = client.post('/users/create',
                           json=dict(password='ForgotAUsername'),
                           follow_redirects=True)
    verify_error_response(response, 400, 'Invalid username')


def test_create_user_empty_password(client: FlaskClient):
    response = client.post('/users/create',
                           json=dict(username='UserFoo', password=''),
                           follow_redirects=True)
    verify_error_response(response, 400, 'Invalid password')


def test_create_user_password_too_short(client: FlaskClient):
    response = client.post('/users/create',
                           json=dict(username='UserFoo', password='123'),
                           follow_redirects=True)
    verify_error_response(response, 400, 'Invalid password')


def test_create_user_username_already_exists(client: FlaskClient):
    username = 'BillWithers'
    verify_create_user(client, username, 'Ain\'t No Sunshine')

    payload = dict(username=username, password='_0123456789ABCDEF_')
    response = client.post('/users/create',
                           json=payload,
                           follow_redirects=True)
    verify_error_response(response, 409, 'Username already exists')


def test_get_user_no_exists(client: FlaskClient):
    response = client.get(f'/users/IDoNotExist', follow_redirects=True)
    verify_error_response(response, 404, 'No such username')
