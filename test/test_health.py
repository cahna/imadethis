from __future__ import annotations
from flask import Flask
from flask.testing import FlaskClient
from flask_jwt_extended import create_access_token
from .shared import auth_header


def test_healthcheck_endpoint(client: FlaskClient):
    response = client.get('/health', follow_redirects=True)

    assert response.status_code == 200


def test_db_healthcheck_endpoint_no_auth(client: FlaskClient):
    response = client.get('/health/db', follow_redirects=True)

    assert response.status_code == 401


def test_db_health_with_auth(test_app: Flask, client: FlaskClient):
    with test_app.app_context():
        access_token = create_access_token(identity={'user': 'test-user'})

    response = client.get('/health/db',
                          headers=auth_header(access_token),
                          follow_redirects=True)

    assert response.status_code == 200
