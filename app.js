'use strict';

const express = require('express');
const { createServer } = require('http');
const morgan = require('morgan');
const initRoutes = require('./config/routes.js');
const WebSocket = require('ws');
const dotenv = require('dotenv');
const request = require('request');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// eslint-disable-next-line no-unused-vars
app.use(function (error, req, res, next) {
    console.error(error);
    return res.json({ code: 'error', message: error.message, data: null, originalError: error });
});

initRoutes(app);

const server = createServer(app);
const socket = new WebSocket.Server({ server });

let clietns = {};
app.set('socket', socket);
app.set('clietns', clietns);

socket.on('connection', (ws, req) => {

    ws.id = req.headers['sec-websocket-key'];
    clietns[ws.id] = ws;
    console.log(`===== new connection is established ${req.connection.remoteAddress} | id: ${ws.id} | number of connected clients : ${socket.clients.size}`);

    ws.send(JSON.stringify({
        code: 200, message: '', data: { SocketID: ws.id, Message: `new connection is established ${req.connection.remoteAddress}` }
    }));

    ws.on('close', () => {
        try {
            delete clietns[ws.id];
            const options = {
                'method': 'DELETE',
                'url': 'https://apricot.diginet.com.vn/lpt-api-dev/device/del-by-token',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tokenDevice: ws.id })

            };
            request(options, function (error, response) {
                if (error) {
                    console.error(`device/del-by-token | id: ${ws.id}  -> error: `, error);
                    return;
                }
                if (!response.body) {
                    console.log(`device/del-by-token | id: ${ws.id} -> response: `, typeof response.body);
                    return;
                }
                console.log(`device/del-by-token | id: ${ws.id} -> response: `, response.body);
            });
            console.log(`===== client disconnected socket ${req.connection.remoteAddress}, number of connected clients : ${socket.clients.size} | clietns lenght: ${Object.keys(clietns).length} `);
        } catch (error) {
            console.error(error);
        }
    });
});

server.listen(process.env.NODE_PORT, () => {
    console.log('Listening on port: ' + process.env.NODE_PORT);
});
