#!/bin/bash

# run unit-test test
yarn test

if [ $? -ne 0 ]; then
    echo "frontend unit-test failed" >&2
    exit 1
fi

# run build
yarn build

if [ $? -ne 0 ]; then
    echo "frontend build failed" >&2
    exit 1
fi

# run test coverage
yarn test --coverage --coverageReporters=text-lcov | coveralls

if [ $? -ne 0 ]; then
    echo "update test coverage fail" >&2
    exit 1
fi

sonar-scanner

exit 0
