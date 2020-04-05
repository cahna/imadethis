# from __future__ import annotations
# from flask.testing import FlaskClient
# from .shared import (
#     create_thread,
#     verify_thread_contents,
#     add_message,
#     random_string,
#     valid_username
# )


# def test_create_thread_no_users(client: FlaskClient):
#     """Request is invalid because 'users' is empty"""
#     response = client.post('/thread',
#                            json={'users': []},
#                            follow_redirects=True)

#     assert response.status_code == 400
#     assert response.content_type == 'application/json'


# def test_create_thread_malformed_request(client: FlaskClient):
#     """Request missing required schema values"""
#     response = client.post('/thread',
#                            json={'foo': True},
#                            follow_redirects=True)

#     assert response.status_code == 400
#     assert response.content_type == 'application/json'


# def test_create_thread_duplicate_username(client: FlaskClient):
#     """Create thread with duplicate username(s)"""
#     repeat_username = valid_username()
#     payload = {
#         'users': [
#             'valid',
#             repeat_username,
#             'test',
#             repeat_username,
#         ],
#     }
#     response = client.post('/thread', json=payload, follow_redirects=True)

#     assert response.status_code == 400
#     assert response.content_type == 'application/json'


# def test_create_thread_username_too_long(client: FlaskClient):
#     """Create thread with username(s) that are too long"""
#     payload = {
#         'users': [valid_username(), random_string(75), random_string(100)],
#     }
#     response = client.post('/thread', json=payload, follow_redirects=True)

#     assert response.status_code == 400
#     assert response.content_type == 'application/json'


# def test_create_thread_username_too_short(client: FlaskClient):
#     """Create thread with username(s) that are too short"""
#     payload = {
#         'users': [valid_username(), valid_username(), ''],
#     }
#     response = client.post('/thread', json=payload, follow_redirects=True)

#     assert response.status_code == 400
#     assert response.content_type == 'application/json'


# def test_create_thread_username_bad_type(client: FlaskClient):
#     """Create thread with username(s) that are not sent as string type"""
#     payload = {
#         'users': [valid_username(), valid_username(), 123],
#     }
#     response = client.post('/thread', json=payload, follow_redirects=True)

#     assert response.status_code == 400
#     assert response.content_type == 'application/json'


# def test_get_nonexistant_thread_id(client: FlaskClient):
#     """Try to retrieve a nonexistant thread_id"""
#     response = client.get('/thread/1')

#     assert response.status_code == 400
#     assert response.content_type == 'application/json'


# def test_add_message_nonexistant_user(client: FlaskClient):
#     """Try to add a message to a thread as a username NOT in the db"""
#     thread_id = create_thread(client, ['happy', 'hooray'])
#     response = add_message(client, thread_id, 'sad', 'Hello, world!')

#     assert response.status_code == 401
#     assert response.content_type == 'application/json'

#     verify_thread_contents(client, thread_id, 0)


# def test_add_message_disallowed_user(client: FlaskClient):
#     """Try to add to a thread as a user that is NOT a member of the thread"""
#     t1_id = create_thread(client, ['person1', 'person2'])
#     t2_id = create_thread(client, ['person3', 'person2'])

#     response = add_message(client, t2_id, 'person1', 'Hello, world!')

#     assert response.status_code == 401
#     assert response.content_type == 'application/json'

#     verify_thread_contents(client, t1_id, 0)
#     verify_thread_contents(client, t2_id, 0)


# def test_get_malformed_thread_id(client: FlaskClient):
#     """Non-integer thread_id in path should 404"""
#     response = client.get('/thread/bad')

#     assert response.status_code == 404

