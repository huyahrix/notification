'use strict';

const express = require('express');
const { createServer } = require('http');
const morgan = require('morgan');
const initRoutes = require('./config/routes.js');
const WebSocket = require('ws');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// eslint-disable-next-line no-unused-vars
app.use(function (error, req, res, next) {
    console.error(error);
    return res.json({ code: 'error', message: error.message, data: null, originalError: error });
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

initRoutes(app);

const server = createServer(app);
const socket = new WebSocket.Server({ server });

let clietns = {};
app.set('socket', socket);
app.set('clietns', clietns);

socket.on('connection', (ws, req) => {
    console.log(`new connection is established ${req.connection.remoteAddress}, number of connected clients : ${socket.clients.size}`);

    ws.id = req.headers['sec-websocket-key'];
    clietns[ws.id] = ws;

    ws.send(JSON.stringify({
        code: 200, message: '', data: { SocketID: ws.id, Message: `new connection is established ${req.connection.remoteAddress}` }
    }));

    ws.on('close', () => {
        delete clietns[ws.id];
        // call api delete device
        console.log('clietns lenght: ', Object.keys(clietns).length);
        console.log(`client disconnected socket ${req.connection.remoteAddress}, number of connected clients : ${socket.clients.size}`);
    });
});

server.listen(process.env.NODE_PORT, () => {
    console.log('Listening on ' + process.env.API_URL);
});
