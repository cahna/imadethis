FROM python:3.7

WORKDIR /usr/src/imadethis_api

RUN pip install gunicorn[gevent]

COPY setup.py setup.cfg README.md ./
COPY imadethis_api imadethis_api/
COPY migrations migrations/

RUN python setup.py install

EXPOSE 5000

CMD gunicorn \
  --worker-class gevent \
  --workers 4 \
  --bind 0.0.0.0:5000 \
  --log-level info \
  --max-requests 10000 \
  --timeout 5 \
  --keep-alive 5 \
  'imadethis_api:create_app()'

