FROM maven:3.3.9-jdk-8-alpine
COPY . /app
WORKDIR /app
ENV OTEL_SERVICE_NAME="send-notification"
CMD java -Dotel.javaagent.debug=true \
    -Dotel.experimental.sdk.metrics.debug=true \
    -Dotel.resource.attributes=service.instance.id=${POD_NAME} \
    -Dotel.javaagent.extensions=/app/otel-configuration-1.0.0-SNAPSHOT.jar \
    -javaagent:/app/opentelemetry-javaagent.jar \
    -jar target/*.jar 
