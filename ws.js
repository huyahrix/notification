/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const WebSocket = require('ws');
const request = require('request');

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
            try {
                delete app.locals.client[ws.id];
                const options = {
                    'method': 'DELETE',
                    'url': 'https://apricot.diginet.com.vn/lpt-api-dev/device/del-by-token',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tokenDevice: ws.id })

                };
                request(options, function (error, response) {
                    try {
                        if (error) {
                            console.error(`===== device/del-by-token, id: '${ws.id}' -> error: `, error);
                            return;
                        }
                        if (!response.body) {
                            console.log(`===== device/del-by-token, id: '${ws.id}' -> response: `, typeof response.body);
                            return;
                        }
                        console.log(`===== device/del-by-token, id: '${ws.id}' => response: `, JSON.parse(response.body).message);
                    } catch (error) {
                        console.log('===== device/del-by-token -> error: ', error);

                    }
                });
                console.log(`===== socket disconnected ${req.connection.remoteAddress}, socket.clients.size : ${socket.clients.size}, app.locals.client.lenght: ${Object.keys(app.locals.client).length} `);
            } catch (error) {
                console.error(error);
            }
        });
    });
};
module.exports = ws;
