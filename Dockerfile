FROM python:3.7

WORKDIR /usr/src/knock_api
ENV PYTHONPATH=/usr/src/knock_api

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY knock_api knock_api/

CMD python ./knock_api/app.py

EXPOSE 8080

