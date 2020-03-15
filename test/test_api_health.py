from __future__ import annotations
from flask.testing import FlaskClient


def test_healthcheck_endpoint(client: FlaskClient):
    response = client.get('/health', follow_redirects=True)

    assert response.status_code == 200

