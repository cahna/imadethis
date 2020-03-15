import os
import logging
from flask import Flask
from flask_migrate import Migrate
from .models import db


logging.basicConfig(level=logging.DEBUG,
                    datefmt='%Y-%m-%d %H:%M:%S',
                    handlers=[logging.StreamHandler()])

logger = logging.getLogger()


def create_app(config_overrides=None):
    logger.info(f'Starting Flask app: {__name__}')

    default_db_uri = 'sqlite:////tmp/knock.db'
    db_uri = os.environ.get('KNOCK_DB_URI') or default_db_uri
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        SQLALCHEMY_DATABASE_URI=db_uri,
        SECRET_KEY='knockknockknock'
    )

    if config_overrides:
        app.config.from_mapping(config_overrides)

    if app.env == 'production' and not os.environ.get('KNOCK_DB_URI'):
        logger.error('Missing KNOCK_DB_URI for production environment!')

    logger.info(f'Configured for environment: {app.env}')

    from . import thread
    app.register_blueprint(thread.bp)

    migrate = Migrate(app, db)

    db.init_app(app)
    migrate.init_app(app, db)

    return app

