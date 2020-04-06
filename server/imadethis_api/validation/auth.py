from typing import List, Mapping
from imadethis_api.exceptions.auth import (
    CreateUserBadUsername,
    CreateUserBadPassword,
    CreateUserBadRequest,
)


def is_valid_username(username) -> bool:
    if not isinstance(username, str):
        return False
    return len(username) > 1


def is_valid_password(password) -> bool:
    if not isinstance(password, str):
        return False
    return len(password) > 5


def validate_auth_user(request_data: Mapping) -> List[str]:
    """If valid data, return [username, password]"""
    if not isinstance(request_data, Mapping):
        raise CreateUserBadRequest()

    username = request_data.get('username')
    password = request_data.get('password')

    if not is_valid_username(username):
        raise CreateUserBadUsername()
    if not is_valid_password(password):
        raise CreateUserBadPassword()

    return username, password

