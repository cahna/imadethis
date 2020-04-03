import uuid
from datetime import datetime
from .db import db, GUID


PK_TYPE = db.BigInteger().with_variant(db.Integer, "sqlite")


class ThreadMembership(db.Model):
    thread_id = db.Column(PK_TYPE,
                          db.ForeignKey('thread.id'),
                          primary_key=True)
    user_id = db.Column(PK_TYPE,
                        db.ForeignKey('user.id'),
                        primary_key=True)
    date_created = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    thread = db.relationship('Thread',
                             backref=db.backref('members', lazy=True))
    user = db.relationship('User',
                           backref=db.backref('belongs_to', lazy=True))


class User(db.Model):
    """Backrefs: 'messages' and 'belongs_to'"""
    id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
    unique_id = db.Column(GUID,
                          nullable=False,
                          unique=True,
                          default=uuid.uuid4)
    username = db.Column(db.String(64), index=True, nullable=False)
    hashed_pw = db.Column(db.String(128), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def as_dict(self):
        return {
            'username': self.username,
            'unique_id': self.unique_id,
            'date_created': self.date_created,
            'threads': [m.thread_id for m in self.belongs_to],
        }


class Thread(db.Model):
    """Backrefs: 'members' and 'messages'"""
    id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
    unique_id = db.Column(GUID,
                          nullable=False,
                          unique=True,
                          default=uuid.uuid4)
    name = db.Column(db.String(64), nullable=False)
    date_created = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    is_private = db.Column(db.Boolean, nullable=False, default=bool)
    hashed_pw = db.Column(db.String(128), nullable=True)

    __table_args__ = (
        db.CheckConstraint(
            'NOT(is_private AND hashed_pw = NULL)',
            name='private_thread_has_pw'
        ),
    )


class ThreadMessage(db.Model):
    message_id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
    thread_id = db.Column(PK_TYPE, db.ForeignKey('thread.id'))
    user_id = db.Column(PK_TYPE, db.ForeignKey('user.id'))
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    thread = db.relationship('Thread',
                             backref=db.backref('messages', lazy=True))
    user = db.relationship('User',
                           backref=db.backref('messages', lazy=True))

