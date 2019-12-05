#!/bin/bash

source ./env.sh

set +e
kubectl create clusterrolebinding permissive-binding \
    --clusterrole=cluster-admin \
    --user=admin \
    --user=kubelet \
    --group=system:serviceaccounts
set -e

# helm init
helm init --wait

echo "########################"
echo "1. Setup MySQL"
echo "########################"
set +e
helm install --name mysql --namespace default stable/mysql \
    --set imageTag=5.7.28 \
    --set mysqlRootPassword=$MYSQL_DB_PW \
    --set mysqlDatabase=$MYSQL_DB_NAME
set -e

echo "########################"
echo "2. Setup Redis"
echo "########################"
set +e
helm install --name redis --namespace default stable/redis \
    --set usePassword=false
set -e

echo "########################"
echo "3. Setup Envoy"
echo "########################"
set +e
helm install --name envoy --namespace default -f ../artifacts/helm/envoy/values.yaml stable/envoy
