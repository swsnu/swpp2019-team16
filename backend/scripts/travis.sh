#!/bin/bash

# run unit-test test
python app/manage.py test ./app

if [ $? -ne 0 ]; then
    echo "backend unit-test failed" >&2
    exit 1
fi

# run flake8
flake8

if [ $? -ne 0 ]; then
    echo "flake8 failed" >&2
    exit 1
fi

exit 0
