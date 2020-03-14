from __future__ import annotations
import os
import pytest
import tempfile
from flask.testing import FlaskClient
from knock_api import create_app
from knock_api.models import db


@pytest.fixture
def client() -> FlaskClient:
    fd, db_file = tempfile.mkstemp()
    config = {
        'SQLALCHEMY_DATABASE_URI': f'sqlite:///{db_file}',
        'TESTING': True,
    }
    test_app = create_app(config)

    with test_app.app_context():
        db.create_all()

    yield test_app.test_client()

    os.close(fd)
    os.unlink(db_file)

