FROM python:3.10

COPY code /code

WORKDIR /code

RUN pip install psutil

RUN pip install speedtest-cli

RUN pip install influxdb-client

CMD ["python", "main.py"]

