from . import auth, users, health


blueprints = [
    health.bp,
    auth.bp,
    users.bp,
]
