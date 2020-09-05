/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const http = require('http');
const config = require('./config/config');
const app = require('./config/express');
const ws = require('./config/ws');

const server = http.createServer(app);
ws(app, server);

server.listen(config.port, () => {
    console.info(`Listening on port ${config.port} (${config.env})`);
});

module.exports = server;
