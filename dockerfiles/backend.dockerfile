FROM python:3.12.1-slim-bookworm



COPY backend /code/


COPY backend/req.txt /code/req.txt

RUN apt-get update \
    && apt-get install -y binutils libproj-dev gdal-bin

RUN pip install --upgrade pip

RUN pip install -r /code/req.txt



WORKDIR /code/app
RUN chmod -R 777 /code/app

# # Use a non-root user
# USER nobody

ENV DJ_PORT 8000

EXPOSE ${DJ_PORT}