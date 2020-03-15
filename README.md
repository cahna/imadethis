# `knock_api` for Knock Full-Stack Interview

See `knock_api.apib` for API documentation.

## Development

### Local Setup

```
# Get code
git clone https://github.com/cahna/knock_api
cd knock_api

# Setup virtualenv for development
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup editable local imports for development
pip install -e .

# Configure environment
export FLASK_APP=knock_api
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

## Manual API Testing

### Healthcheck

```
curl -L -f http://127.0.0.1:5000/health
```

### Create a thread

```
curl -d '{"users":["kiefer","jeff_goldblum"]}' -H 'Content-Type: application/json' -L http://127.0.0.1:5000/thread
```

Example response:

```
{"thread_id":123}
```

### Post a message to a thread

```
curl -d '{"message":"Hello, world!"}' -H 'Content-Type: application/json' -L http://127.0.0.1:5000/thread/123/kiefer
```

### Get thread messages

```
curl -L http://127.0.0.1:5000/thread/123
```

Example response:

```
{"messages":[{"username":"kiefer","message":"Hello, world!"}]}
```

## Production deployment

### DB Migrations

For non-SQLite databases. Must be run manually on-demand until automation configured.

1. `flask db init`    : Enable migrations support
2. `flask db migrate` : Create first migration (commit changes to VCS)
3. `flask db upgrade` : Apply migration

### Docker

To start a development stack:

```
docker-compose up -d
```

Once running, the steps from `Manual API Testing` may be used to verify the environment.

## React UI
**TODO**

