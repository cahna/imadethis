__version__ = '0.1'
__author__ = 'Conor Heine'

# import os
from flask import Flask
from flask_migrate import Migrate
from .models import db


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

