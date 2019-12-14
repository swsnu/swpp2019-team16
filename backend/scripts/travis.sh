#!/bin/bash

function test_component() {
    PACKAGE=$1
    cd $PACKAGE

    echo "###########################"
    echo "RUN [$PACKAGE] MIGRATION"
    echo "###########################"

    python3 manage.py migrate --settings=$PACKAGE.settings.development

    echo "###########################"
    echo "RUN [$PACKAGE] CHECK CODE FORMATTING"
    echo "###########################"

    # run flake8
    flake8 . --exit-zero
    if [ $? -ne 0 ]; then
        echo "flake8 failed" >&2
        exit 1
    fi

    echo "###########################"
    echo "RUN [$PACKAGE] TEST"
    echo "###########################"

    # run test
    python3 manage.py test --settings=$PACKAGE.settings.development

    if [ $? -ne 0 ]; then
        echo "django test failed" >&2
        exit 1
    fi

    echo "###########################"
    echo "RUN [$PACKAGE] COVERAGE"
    echo "###########################"

    # run coverage
    coverage run --source=. manage.py test --settings=$PACKAGE.settings.development

    cd ..

    # combine coverage
    coverage combine --append ./$PACKAGE/.coverage
}

test_component api_gateway
test_component common
test_component user_service
test_component carpool_request_service
test_component group_service
test_component grpc_gateway

coverage report -m

exit 0
