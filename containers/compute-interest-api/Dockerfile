FROM maven:3.3.9-jdk-8-alpine
COPY . /app
WORKDIR /app
RUN apk update && apk add mysql mysql-client
ENTRYPOINT ["/app/custom-entrypoint.sh"]
ENV OTEL_SERVICE_NAME=compute-interest-api
ENV OTEL_INSTRUMENTATION_COMMON_PEER_SERVICE_MAPPING="send-notification=send-notification"
CMD java \
    -Dotel.experimental.sdk.metrics.debug=true \
    -Dotel.resource.attributes=service.instance.id=${POD_NAME} \
    -Dotel.javaagent.extensions=/app/otel-configuration-1.0.0-SNAPSHOT.jar \
    -javaagent:/app/opentelemetry-javaagent.jar \
    -jar target/*.jar 
