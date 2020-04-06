# `imadethis_api`

![Python application](https://github.com/cahna/imadethis/workflows/Python%20application/badge.svg)

## Usage

See `imadethis_api.apib` for API documentation.

## Development

### Local Setup

```
# Get code
git clone https://github.com/cahna/imadethis
cd imadethis/server

# Setup virtualenv for development
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup editable local imports for development
pip install -e .

# Configure environment
export FLASK_APP=imadethis_api
export FLASK_ENV=development
```

### Test

```
pytest -v
# OR:
python setup.py test
```

Code coverage:

```
coverage run -m pytest
coverage report
```

Lint:

```
flake8
```

### Run development server

```
flask run
```

### PostgreSQL for Development

By default, SQLite is used for development (SQLite is always used for tests).
To use a PostgreSQL container for development:

```
# Start a postgres container:
docker run -d --name postgres-imadethis -p 5432:5432 -e POSTGRES_USER=imadethis -e POSTGRES_PASSWORD=imadethis postgres:12

# Set environment variable to configure connection:
export IMADETHIS_DB_URI=postgresql://imadethis:imadethis@localhost:5432/imadethis
```

## Manual API Testing

### Healthcheck

```
curl -L -f http://127.0.0.1:5000/health
```

### Register a user

```
curl -X POST -H 'Content-Type: application/json' \
    -d '{"username":"testuser","password":"abcd1234"}' \
    -L http://127.0.0.1:5000/auth/register
```

Example response:

```
{"access_token":"$SIGNED_TOKEN$"}
```

### Get info for active user

```
curl -H 'Authorization: Bearer $SIGNED_TOKEN$' \
    -L http://127.0.0.1:5000/users/active_user
```

Example response:

```
{
    "username": "testuser",
    "unique_id": "$UUID$",
    ...
}
```

## Production deployment

### DB Migrations

For non-SQLite databases. Must be run manually on-demand until automation configured.

1. `flask db init`    : Enable migrations support
2. `flask db migrate` : Create first migration (commit changes to VCS)
3. `flask db upgrade` : Apply migration
