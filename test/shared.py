from __future__ import annotations
from typing import List
import random
import string
from flask.testing import FlaskClient
from werkzeug.wrappers import Response


VALID_CHARACTERS = string.ascii_letters + string.digits


def random_string(length: int) -> str:
    return ''.join([
        random.choice(VALID_CHARACTERS) for _ in range(length)
    ])


def valid_username() -> str:
    return random_string(random.randint(1, 63))


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

