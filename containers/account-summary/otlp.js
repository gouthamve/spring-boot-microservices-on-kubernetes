// Require dependencies
const opentelemetry = require("@opentelemetry/sdk-node");
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-grpc");  
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-grpc");
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');

// For troubleshooting, set the log level to DiagLogLevel.DEBUG
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
var metricsExporter = new OTLPMetricExporter({});


const sdk = new opentelemetry.NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  traceExporter: new OTLPTraceExporter({}),
  metricReader: new PeriodicExportingMetricReader({
    exporter: metricsExporter,
    exportIntervalMillis: 1000,
  }),
});

sdk.start()