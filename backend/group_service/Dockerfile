# Run docker build command in the context of ~/backend NOT ~/backend/api_gateway

FROM python:3.7

# The enviroment variable ensures that the python output is set straight
# to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /app/backend

WORKDIR /app/backend

# Add requirements.txt before rest of repo for caching
ADD ./requirements/development.txt .
RUN pip install -r ./development.txt

COPY . .

WORKDIR /app/backend/group_service

EXPOSE 8000

ENTRYPOINT ["/bin/sh", "-c"]

