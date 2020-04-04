from __future__ import annotations
from flask.testing import FlaskClient
from .shared import verify_register_user


def test_register_user(client: FlaskClient):
    username = 'abcdefghijklmnopqrstuvwxyz'
    password = '*0123456789_ABCDEF#'
    verify_register_user(client, username, password)
