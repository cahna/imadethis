from werkzeug.exceptions import HTTPException


class ActionForbidden(HTTPException):
    code = 403
    description = 'Action Forbidden'
