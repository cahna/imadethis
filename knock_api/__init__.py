import os
import logging
from werkzeug.exceptions import HTTPException
from flask import Flask, jsonify
from flask_migrate import Migrate
from .models import db


DEFAULT_DB_URI = 'sqlite:////tmp/knock.db'

logging.basicConfig(level=logging.DEBUG,
                    datefmt='%Y-%m-%d %H:%M:%S',
                    handlers=[logging.StreamHandler()])
logger = logging.getLogger()


def configure_app(app, config_overrides=None):
    db_uri = os.environ.get('KNOCK_DB_URI') or DEFAULT_DB_URI
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


def create_app(config_overrides=None):
    logger.info(f'Starting Flask app: {__name__}')

    app = Flask(__name__)
    configure_app(app, config_overrides)

    @app.errorhandler(HTTPException)
    def bad_request(error):
        return jsonify({'error': error.description}), error.code

    from . import health, thread, users
    for resource in [health, thread, users]:
      app.register_blueprint(resource.bp)

    migrate = Migrate(app, db)

    db.init_app(app)
    migrate.init_app(app, db)

    return app

