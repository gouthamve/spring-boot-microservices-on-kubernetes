#/bin/bash

mvn package
docker build --platform=linux/amd64 -t gouthamve/java-application-compute-interest-api:$1 .
docker push gouthamve/java-application-compute-interest-api:$1
