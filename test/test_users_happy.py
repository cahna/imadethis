from __future__ import annotations
from flask.testing import FlaskClient
from .shared import verify_create_user, verify_get_user


def test_create_user(client: FlaskClient):
    username = 'abcdefghijklmnopqrstuvwxyz'
    password = '*0123456789_ABCDEF#'
    verify_create_user(client, username, password)


def test_get_existing_user(client: FlaskClient):
    username = 'abc123'
    password = 'P4ssW0rD:D'
    verify_create_user(client, username, password)
    verify_get_user(client, username)
