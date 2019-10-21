#!/bin/bash

# run code formatting test
cd app
flake8 . --exit-zero
cd ..

# run test
python app/manage.py test --settings=app.settings.development

if [ $? -ne 0 ]; then
    echo "backend test failed" >&2
    exit 1
fi

# run test coverage
coverage run --source='app' app/manage.py test --settings=app.settings.development

coverage report -m

exit 0
