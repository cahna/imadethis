from werkzeug.exceptions import HTTPException


class UsernameAlreadyExists(HTTPException):
    code = 409
    description = 'Username already exists'


class NoSuchUsername(HTTPException):
    code = 404
    description = 'No such username'


class CreateUserBadRequest(HTTPException):
    code = 400
    description = 'Bad request'


class CreateUserBadUsername(CreateUserBadRequest):
    description = 'Invalid username'


class CreateUserBadPassword(CreateUserBadRequest):
    description = 'Invalid password'
