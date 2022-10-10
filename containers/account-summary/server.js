// Copyright 2018 IBM Corp. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

var express = require('express'),
    mysql = require('mysql2'),
    app = express(),
    server = require('http').Server(app),
    pinoExpress = require('express-pino-logger'),
    eta = require("eta");


var port = process.env.PORT || 4000;

app.use(pinoExpress({
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
          }),
        res: (res) => ({
            statusCode: res.statusCode,
        })
    },
}));

app.engine('js', eta.renderFile);
app.set('view engine', 'eta');

app.set('views',  __dirname + '/views');
app.use(express.static('public'))

var hostName = process.env.MYSQL_DB_HOST || "account-database";
var portNumber = process.env.MYSQL_DB_PORT || "3306";
var username = process.env.MYSQL_DB_USER || "michaelbolton";
var password = process.env.MYSQL_DB_PASSWORD || "password";

var client = mysql.createConnection({
    host: hostName,
    port: portNumber,
    user: username,
    password: password,
    database: "dockercon2017"
});

app.get('/', function(req, res, next) {
    var queryText = 'SELECT * FROM account WHERE id=12345'
    client.query(queryText, function(error, result) {
        if (error) {
            next(error)
            return
        } 

        res.render('index', {
            balance: result[0].balance,
        });
    });
});

server.listen(port, function() {
    var port = server.address().port;
    console.log('App running on port ' + port);
});
