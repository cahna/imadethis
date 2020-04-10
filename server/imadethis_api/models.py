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
                return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                value = uuid.UUID(value)
            return value


class User(db.Model):
    """Backrefs: 'builds'"""
    id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
    unique_id = db.Column(GUID(),
                          nullable=False,
                          unique=True,
                          default=uuid.uuid4)
    username = db.Column(db.String(64),
                         index=True,
                         unique=True,
                         nullable=False)
    hashed_pw = db.Column(db.String(128), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def dto(self):
        return {
            'username': self.username,
            'uniqueId': self.unique_id,
            'dateCreated': self.date_created,
            'builds': [b.unique_id for b in self.builds],
        }

    def jwt_identity(self):
        return {
            'username': self.username,
            'unique_id': self.unique_id,
        }


class JwtBlacklist(db.Model):
    """JTIs in this table are considered revoked"""
    id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
    jti = db.Column(db.String(36), unique=True, index=True, nullable=False)
    user_unique_id = db.Column(GUID(),
                               db.ForeignKey('user.unique_id'),
                               nullable=False)
    blacklist_date = db.Column(db.DateTime, default=datetime.utcnow)


# class BuildTag(db.Model):
#     id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
#     unique_id = db.Column(GUID(),
#                           nullable=False,
#                           unique=True,
#                           default=uuid.uuid4)
#     name = db.Column(db.String(32),
#                      index=True,
#                      unique=True,
#                      nullable=False)
#     description = db.Column(db.Text)
#     date_created = db.Column(db.DateTime, default=datetime.utcnow)
#     created_by = db.Column(PK_TYPE, db.ForeignKey('user.id'))


class Build(db.Model):
    id = db.Column(PK_TYPE, primary_key=True, autoincrement=True)
    unique_id = db.Column(GUID(),
                          nullable=False,
                          unique=True,
                          default=uuid.uuid4)
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.Text)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    date_updated = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(PK_TYPE, db.ForeignKey('user.id'), nullable=False)

    builder = db.relationship('User',
                              backref=db.backref('builds', lazy=True))


# class BuildTagsAssociation(db.Model):
#     build_id = db.Column(PK_TYPE,
#                          db.ForeignKey('build.id'),
#                          primary_key=True)
#     tag_id = db.Column(PK_TYPE,
#                        db.ForeignKey('BuildTag.id'),
#                        primary_key=True)
