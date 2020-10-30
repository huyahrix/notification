/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const SocketController = {
    /**
     @api {put} /socket/push   01. push notify use web socket
     @apiName push
     @apiDescription Author: ngochuy
     @apiVersion 1.0.0
     @apiGroup socket

     @apiParam {String}    to                   The to is required
     @apiParam {String}    content_available    The content_available is required
     @apiParam {String}    priority             The priority is required
     @apiParam {String}    notification         The notification is required
     @apiParam {String}    aps                  The aps is required
     @apiParam {String}    data                 The data is required

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
        winston.info('===== SocketController.push => START =====');
        let clients = req.app.locals.clients;
        const params = req.body;

        if (!params || !params.to || !params.content_available || !params.priority || !params.notification || !params.aps || !params.data) {
            return res.json({ code: 'ERR001', message: 'invalid params.', data: null });
        }

        if (clients && clients[params.to] && clients[params.to].readyState === 1) {
            clients[params.to].send(JSON.stringify(params));
            winston.info(`===== SocketController.push | id: '${params.to}' => sent successful`);
            return res.json({ code: 200, message: '', data: { Status: 0, Message: 'successful' } });
        }
        winston.warn(`===== SocketController.push | id: '${params.to}' => error : client id not found`);
        return res.json({ code: 200, message: '', data: { Status: 1, Message: 'client id not found' } });
    },
    /**
     @api {put} /socket/push-all   02. push notify use web socket to all connections
     @apiName push-all
     @apiDescription Author: ngochuy
     @apiVersion 1.0.0
     @apiGroup socket

     @apiParam {String}    to                   The to is required
     @apiParam {String}    content_available    The content_available is required
     @apiParam {String}    priority             The priority is required
     @apiParam {String}    notification         The notification is required
     @apiParam {String}    aps                  The aps is required
     @apiParam {String}    data                 The data is required

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
        winston.info('===== SocketController.pushAll => START =====');
        let socket = req.app.get('socket');
        const params = req.body;

        if (!params || !params.to || !params.content_available || !params.priority || !params.notification || !params.aps || !params.data) {
            return res.json({ code: 'ERR001', message: 'invalid params.', data: null });
        }

        socket.clients.forEach((client) => {
            if (client.readyState === 1) {
                winston.info(`id: '${client.id}'`);
                client.send(JSON.stringify(params));
            }
        });
        res.json({ code: 200, message: '', data: { Status: 0, Message: '' } });
    },
};

module.exports = SocketController;
