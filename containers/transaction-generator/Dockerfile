FROM python:3.10
ADD transaction-generator.py .
RUN pip install requests opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-requests
ENV OTEL_SERVICE_NAME=transaction-generator
CMD opentelemetry-instrument python transaction-generator.py
