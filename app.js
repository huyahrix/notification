/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const express = require('express');
const http = require('http');
const ws = require('./ws');
const morgan = require('morgan');
const initRoutes = require('./config/routes.js');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = module.exports =  express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

initRoutes(app);

const server = http.createServer(app);
ws(app, server);

server.listen(process.env.NODE_PORT, () => {
    console.log('Listening on port: ' + process.env.NODE_PORT);
});
