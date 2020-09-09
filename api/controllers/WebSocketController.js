/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const SMSController = {
    /**
     @api {post} /socket/push   01. push notify use web socket
     @apiName push
     @apiDescription Author: ngochuy
     @apiVersion 1.0.0
     @apiGroup socket

     @apiSuccessExample Success-Response
     HTTP/1.1 200 ok
     {
        "code": 200,
        "message": "",
        "data": {
            "Status": 0,
            "Message": "successful"
        }
     }

     @apiErrorExample Error-Response
     HTTP/1.1 400 Bad request
    */
    push: async (req, res) => {
        console.log('===== WebSocketController.push => START =====');
        let clients = req.app.locals.clients;
        const params = req.body;
        if (!params || !params.to) {
            return res.json({ code: 'ERR001', message: 'invalid params.', data: null });
        }

        if (clients && clients[params.to] && clients[params.to].readyState === 1) {
            clients[params.to].send(JSON.stringify(params));
            console.log(`===== WebSocketController.push | id: '${params.to}' => sent successful`);
            return res.json({ code: 200, message: '', data: { Status: 0, Message: 'successful' } });
        }
        console.log(`===== WebSocketController.push | id: '${params.to}' => error : client id not found`);
        return res.json({ code: 200, message: '', data: { Status: 1, Message: 'client id not found' } });
    },
    /**
     @api {post} /socket/push-all   02. push notify use web socket to all connections
     @apiName push-all
     @apiDescription Author: ngochuy
     @apiVersion 1.0.0
     @apiGroup socket

     @apiSuccessExample Success-Response
     HTTP/1.1 200 ok
     {
        "code": 200,
        "message": "",
        "data": {
            "Status": 0,
            "Message": "successful"
        }
     }

     @apiErrorExample Error-Response
     HTTP/1.1 400 Bad request
    */
    pushAll: async (req, res) => {
        console.log('===== WebSocketController.pushAll => START =====');
        let socket = req.app.get('socket');
        const data = require('../services/data');
        socket.clients.forEach((client) => {
            if (client.readyState === 1) {
                console.log('id:', `'${client.id}'`);
                client.send(JSON.stringify(data));
            }
        });
        res.json({ code: 200, message: '', data: { Status: 0, Message: '' } });
    },
};

module.exports = SMSController;
