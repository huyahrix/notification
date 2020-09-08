/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const WebSocket = require('ws');
const axios = require('axios');

const ws = (app, server) => {

    app.locals.client = [];
    const socket = new WebSocket.Server({ server });
    app.set('socket', socket);

    socket.on('connection', (ws, req) => {

        ws.id = req.headers['sec-websocket-key'];
        app.locals.client[ws.id] = ws;
        console.log(`===== socket connected ${req.connection.remoteAddress}, id: '${ws.id}', socket.clients.size : ${socket.clients.size}`);

        ws.send(JSON.stringify({
            code: 200, message: '', data: { SocketID: ws.id, Message: `new connection is established ${req.connection.remoteAddress}` }
        }));

        ws.on('close', () => {

            delete app.locals.client[ws.id];

            const data = JSON.stringify({ tokenDevice: ws.id });

            const config = {
                method: 'delete',
                url: 'https://apricot.diginet.com.vn/lpt-api-dev/device/del-by-token',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(`===== device/del-by-token, id: '${ws.id}' => response: `, JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.error(`===== device/del-by-token, id: '${ws.id}' -> error: `, error);
                    return;
                });

            console.log(`===== socket disconnected ${req.connection.remoteAddress}, socket.clients.size : ${socket.clients.size}, app.locals.client.lenght: ${Object.keys(app.locals.client).length} `);

        });
    });
};
module.exports = ws;
