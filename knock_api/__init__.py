import os
import collections
from datetime import datetime
from flask import Flask, Blueprint, request, abort
from flask_migrate import Migrate
from .models import db, User, Thread, ThreadMembership, ThreadMessage

def create_app(config_overrides=None):
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SQLALCHEMY_DATABASE_URI='sqlite:////tmp/knock.db',
        SECRET_KEY='knockknockknock'
        # SQLALCHEMY_DATABASE_URI=os.environ['KNOCK_API_DB_URI']
    )

    if config_overrides:
        app.config.from_mapping(config_overrides)

    from . import thread
    app.register_blueprint(thread.bp)

    migrate = Migrate(app, db)

    db.init_app(app)
    migrate.init_app(app, db)

    return app

