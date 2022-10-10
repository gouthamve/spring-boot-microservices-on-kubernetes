FROM node:16.17.1-slim

WORKDIR /app

RUN npm install -g nodemon
ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls
RUN mv /app/node_modules /node_modules

ADD . /app

EXPOSE 80
ENV PORT 80
ENV OTEL_SERVICE_NAME=account-summary

CMD ["node", "--require", "./otlp.js", "server.js"]
