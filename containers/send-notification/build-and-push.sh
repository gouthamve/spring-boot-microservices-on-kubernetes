#/bin/bash

mvn package
docker build --platform=linux/amd64 -t gouthamve/java-application-send-notification:$1 .
docker push gouthamve/java-application-send-notification:$1
