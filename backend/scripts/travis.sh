#!/bin/bash

# run code formatting test
cd common
flake8 . --exit-zero
cd ..

# run test
python common/manage.py test --settings=common.settings.development

if [ $? -ne 0 ]; then
    echo "backend test failed" >&2
    exit 1
fi

# run test coverage
coverage run --source='common' common/manage.py test --settings=common.settings.development

coverage report -m

exit 0
