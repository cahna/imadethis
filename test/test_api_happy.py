from __future__ import annotations
from flask.testing import FlaskClient
from .shared import (
    create_thread,
    verify_thread_contents,
    verify_add_message,
    random_string,
    valid_username
)


def test_create_thread_1_user(client: FlaskClient):
    """Basic create thread: 1 user"""
    thread_id = create_thread(client, ['abcdefghijklmnopqrstuvwxyz'])
    verify_thread_contents(client, thread_id)


def test_create_thread_2_users(client: FlaskClient):
    """Basic create thread: 2 users"""
    thread_id = create_thread(client, ['foo', '123'])
    verify_thread_contents(client, thread_id)


def test_create_thread_n_users(client: FlaskClient):
    """Basic create thread: >2 users"""
    valid_usernames = ['foo', 'bar', 'baz', 'gif', valid_username()]
    thread_id = create_thread(client, valid_usernames)
    verify_thread_contents(client, thread_id)


def test_create_threads_same_users(client: FlaskClient):
    """Create 2 different threads with the same members"""
    t1_id = create_thread(client, ['person1', 'person2'])
    t2_id = create_thread(client, ['person2', 'person1'])

    assert t1_id != t2_id

    verify_thread_contents(client, t1_id)
    verify_thread_contents(client, t2_id)


def test_create_threads_different_users(client: FlaskClient):
    """Create 2 threads with different users"""
    t1_id = create_thread(client, ['person1', 'person2'])
    t2_id = create_thread(client, ['person3', 'bot1337'])

    assert t1_id != t2_id

    verify_thread_contents(client, t1_id)
    verify_thread_contents(client, t2_id)


def test_create_threads_with_new_and_existing_users(client: FlaskClient):
    """Create threads with combinations of new and existing users"""
    threads = [
        create_thread(client, ['A', 'B']),
        create_thread(client, ['B', 'C', 'D']),
        create_thread(client, ['A', 'D', 'E', 'F']),
        create_thread(client, ['G', 'H', 'I']),
        create_thread(client, ['J']),
    ]

    assert len(set(threads)) == len(threads), \
        'should return all unique thread ids'

    for t_id in threads:
        verify_thread_contents(client, t_id)


def test_add_message_valid_user(client: FlaskClient):
    thread_id = create_thread(client, ['happy', 'hooray'])
    verify_add_message(client, thread_id, 'happy', 'Hello, world!')
    messages = verify_thread_contents(client, thread_id, 1)

    assert messages[0]['username'] == 'happy'
    assert messages[0]['message'] == 'Hello, world!'


def test_add_messages_from_all_valid_users(client: FlaskClient):
    user1, user2, user3 = 'A', '2', valid_username()
    user1_msg = random_string(23)
    user2_msg = random_string(124)
    user3_msg = random_string(55)
    thread_id = create_thread(client, [user1, user2, user3])

    # Add message from user2
    verify_add_message(client, thread_id, user2, user2_msg)
    messages = verify_thread_contents(client, thread_id, 1)

    assert messages[0]['username'] == user2
    assert messages[0]['message'] == user2_msg

    # Add message from user1
    verify_add_message(client, thread_id, user1, user1_msg)
    messages = verify_thread_contents(client, thread_id, 2)

    assert messages[0]['username'] == user2
    assert messages[0]['message'] == user2_msg
    assert messages[1]['username'] == user1
    assert messages[1]['message'] == user1_msg

    # Add message from user3
    verify_add_message(client, thread_id, user3, user3_msg)
    messages = verify_thread_contents(client, thread_id, 3)

    assert messages[0]['username'] == user2
    assert messages[0]['message'] == user2_msg
    assert messages[1]['username'] == user1
    assert messages[1]['message'] == user1_msg
    assert messages[2]['username'] == user3
    assert messages[2]['message'] == user3_msg

