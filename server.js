'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
const morgan = require('morgan');
const initRoutes = require('./config/routes.js');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

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
        code: 200,
        message: '',
        data: {
            SocketID: ws.id,
            Message: `new connection is established ${req.connection.remoteAddress}`
        }
    }));

    ws.on('message', (message) => {
        //console.log(`received: ${message} from client: ${req.connection.remoteAddress}`);
        //ws.send(`server receive message '${message}' from client: ` + req.connection.remoteAddress);
    });

    ws.on('close', () => {
        console.log(`client disconnected socket ${req.connection.remoteAddress}, number of connected clients : ${socket.clients.size}`);

    });
});
const dotenv = require('dotenv');
dotenv.config();

server.listen(process.env.NODE_PORT, () => {
    console.log('Listening on '+ process.env.API_URL);
});