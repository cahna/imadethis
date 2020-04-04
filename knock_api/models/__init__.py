import uuid
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID

db = SQLAlchemy()
PK_TYPE = db.BigInteger().with_variant(db.Integer, "sqlite")


class GUID(db.TypeDecorator):
    """Platform-independent GUID type.

    Uses PostgreSQL's UUID type, otherwise uses
    CHAR(32), storing as stringified hex values.

    """
    impl = db.CHAR

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(db.CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value).int
            else:
                # hexstring
                return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                value = uuid.UUID(value)
            return value


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
    unique_id = db.Column(GUID(),
                          nullable=False,
                          unique=True,
                          default=uuid.uuid4)
    username = db.Column(db.String(64), index=True, nullable=False)
    hashed_pw = db.Column(db.String(128), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def dto(self):
        return {
            'username': self.username,
            'unique_id': self.unique_id,
            'date_created': self.date_created,
            'threads': [t.unique_id for t in self.belongs_to],
        }

    def jwt_identity(self):
        return {
            'username': self.username,
            'unique_id': self.unique_id,
        }


class Thread(db.Model):
    """Backrefs: 'members' and 'messages'"""
    id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
    unique_id = db.Column(GUID(),
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
