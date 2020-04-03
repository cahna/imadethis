from typing import List
from knock_api.security import flask_bcrypt
from knock_api.models import db, User
from knock_api.exceptions.users import UsernameAlreadyExists, NoSuchUsername


def username_exists(username: str) -> bool:
    return bool(db.session.query(User)
                          .filter_by(username=username).first())


def get_user_by_username(username: str) -> User:
    user = User.query.filter_by(username=username).first()

    if not user:
        raise NoSuchUsername()

    return user


def get_users(user_ids: List[str]) -> List[User]:
    return db.session.query(User) \
                     .filter(User.username.in_(user_ids)).all()


def create_user(username: str, password: str) -> User:
    if username_exists(username):
        raise UsernameAlreadyExists()

    hashed_pw = flask_bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, hashed_pw=hashed_pw)

    db.session.add(new_user)
    db.session.commit()

    return new_user
