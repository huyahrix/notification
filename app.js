/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const http = require('http');
const app = require('./config/express');
require('./config/mongoose');
const ws = require('./config/ws');

const server = http.createServer(app);
ws(app, server);

server.listen(config.port, () => {
    console.info(`Listening on port ${config.port} (${config.env})`);
});

module.exports = server;
