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

    app.locals.clients = [];
    const socket = new WebSocket.Server({ server });
    app.set('socket', socket);

    socket.on('connection', (ws, req) => {

        ws.id = req.headers['sec-websocket-key'];
        app.locals.clients[ws.id] = ws;
        winston.info(`===== socket connected ${req.connection.remoteAddress}, id: '${ws.id}', socket.clients.size : ${socket.clients.size}`);

        ws.send(JSON.stringify({
            code: 200, message: '', data: { SocketID: ws.id, Message: `new connection is established ${req.connection.remoteAddress}` }
        }));

        ws.on('close', () => {

            delete app.locals.clients[ws.id];

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
                    winston.info(util.format(`===== device/del-by-token, id: '${ws.id}' => response: `, JSON.stringify(response.data)));
                })
                .catch(function (e) {
                    winston.error(util.format(`===== device/del-by-token, id: '${ws.id}' -> error: `, e));
                });

            winston.info(`===== socket disconnected ${req.connection.remoteAddress}, {socket.clients.size : ${socket.clients.size}, app.locals.client.lenght: ${Object.keys(app.locals.clients).length} `);

        });
    });
};
module.exports = ws;
