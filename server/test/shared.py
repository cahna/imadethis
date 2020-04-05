from __future__ import annotations
from typing import List, Mapping
import random
import string
from flask.testing import FlaskClient
from werkzeug.wrappers import Response


VALID_CHARACTERS = string.ascii_letters + string.digits
UUID_LENGTH = 36


def random_string(length: int) -> str:
    return ''.join([
        random.choice(VALID_CHARACTERS) for _ in range(length)
    ])


def valid_username() -> str:
    return random_string(random.randint(1, 63))


def auth_header(access_token: str) -> Mapping:
    return {
        'Authorization': f'Bearer {access_token}'
    }


def verify_error_response(response: Response, code: int, message: str = None):
    assert response.status_code == code
    assert response.content_type == 'application/json'

    if message:
        data = response.get_json()
        assert 'error' in data
        err_msg = data['error']
        assert err_msg == message, \
            f'Expected error: "{message}". Instead got: "{err_msg}"'


def verify_user_response(response: Response,
                         unique_id: str = None,
                         username: str = None) -> Mapping:
    assert response.status_code == 200
    assert response.content_type == 'application/json'

    user_data = response.get_json()

    assert 'username' in user_data
    assert 'unique_id' in user_data
    assert 'password' not in user_data
    assert 'hashed_pw' not in user_data

    response_unique_id = user_data['unique_id']
    id_len = len(response_unique_id)

    assert id_len == UUID_LENGTH, \
        f'Expected id_len == {UUID_LENGTH}. Instead got: {id_len}'

    if unique_id:
        assert response_unique_id == unique_id
    if username:
        assert user_data.get('username') == username

    return user_data


def verify_auth_register_response(response: Response) -> Mapping:
    assert response.status_code == 200
    assert response.content_type == 'application/json'

    data = response.get_json()
    token = data.get('access_token')

    assert token, 'Missing auth token in response'
    assert len(token) > 1

    return data


def verify_register_user(client: FlaskClient,
                         username: str,
                         password: str) -> Mapping:
    payload = dict(username=username, password=password)
    response = client.post('/auth/register',
                           json=payload,
                           follow_redirects=True)

    return verify_auth_register_response(response)


def verify_get_active_user(client: FlaskClient,
                           access_token: str,
                           username: str = None) -> Mapping:
    assert access_token

    response = client.get(f'/users/active_user',
                          headers={'Authorization': f'Bearer {access_token}'},
                          follow_redirects=False)

    return verify_user_response(response, username=username)


def create_thread(client: FlaskClient, users: List[str]) -> int:
    response = client.post('/thread',
                           json={'users': users},
                           follow_redirects=True)

    assert response.status_code == 200
    assert response.content_type == 'application/json'

    data = response.get_json()

    assert 'thread_id' in data
    assert int(data['thread_id']) == data['thread_id'], \
        'thread_id should be int'

    return data['thread_id']


def verify_thread_contents(client: FlaskClient,
                           thread_id: int,
                           expect_length: int = 0) -> List[dict]:
    response = client.get(f'/thread/{thread_id}', follow_redirects=True)

    assert response.status_code == 200, \
        f'Received code: {response.status_code}'
    assert response.content_type == 'application/json'
    data = response.get_json()
    assert 'messages' in data
    assert len(data['messages']) == expect_length

    return data['messages']


def add_message(client: FlaskClient,
                thread_id: int,
                username: str,
                message: str) -> Response:
    return client.post(f'/thread/{thread_id}/{username}',
                       json={'message': message},
                       follow_redirects=True)


def verify_add_message(client: FlaskClient,
                       thread_id: int,
                       username: str,
                       message: str) -> Response:
    response = add_message(client, thread_id, username, message)

    assert response.status_code == 204
    assert response.content_type == 'application/json'

    return response


def verify_user(client: FlaskClient,
                username: str,
                thread_ids: List[int]) -> Mapping:
    response = client.get(f'/users/{username}', follow_redirects=True)

    assert response.status_code == 200, \
        f'Received code: {response.status_code}'
    assert response.content_type == 'application/json'
    data = response.get_json()
    assert 'username' in data
    assert 'threads' in data
    assert len(data['threads']) == len(thread_ids)
    assert all(tid in data['threads'] for tid in thread_ids)

    return data
