# Run docker build command in the context of ~/backend NOT ~/backend/api_gateway

FROM python:3.7

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app/backend

WORKDIR /app/backend

COPY . .

RUN pip install -r ./requirements/development.txt

WORKDIR /app/backend/api_gateway

EXPOSE 8000

ENTRYPOINT ["gunicorn", "api_gateway.wsgi"]

