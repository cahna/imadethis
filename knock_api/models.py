from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class ThreadMembership(db.Model):
    thread_id = db.Column(db.Integer,
                          db.ForeignKey('thread.id'),
                          primary_key=True)
    username = db.Column(db.String(64),
                         db.ForeignKey('user.username'),
                         primary_key=True)

    thread = db.relationship('Thread',
                             backref=db.backref('members', lazy=True))
    user = db.relationship('User',
                           backref=db.backref('belongs_to', lazy=True))


class User(db.Model):
    username = db.Column(db.String(64), primary_key=True)


class Thread(db.Model):
    id = db.Column(db.Integer, primary_key=True)


class ThreadMessage(db.Model):
    message_id = db.Column(db.Integer, primary_key=True)
    thread_id = db.Column(db.Integer, db.ForeignKey('thread.id'))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    username = db.Column(db.String(64),
                         db.ForeignKey('user.username'),
                         nullable=False)

    thread = db.relationship('Thread',
                             backref=db.backref('messages', lazy=True))
    user = db.relationship('User',
                           backref=db.backref('messages', lazy=True))

