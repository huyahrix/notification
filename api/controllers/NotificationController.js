'use strict';

const NotificationController = {
    push: async (req, res) => {
        console.log('===== NotificationController.push =====');
        let clietns = req.app.get('clietns');
        try {
            const params = req.body;
            if (!params || !params.data) {
                return res.json({ code: 'ERR001', message: 'The data is requied. ', data: null, originalError: { message: '' } });
            }
            let notifications = {};
            if (typeof params.data === 'object' && params.data.to) {
                notifications = params.data;
            }
            else {
                try {
                    notifications = JSON.parse(params.data);
                } catch (error) {
                    if (error) {
                        console.error('===== NotificationController.push -> JSON.parse | error: ', error.message);
                    }
                }
            }
            if (!notifications || !Object.keys(notifications).length) {
                return res.json({ code: 'ERR002', message: 'The data is not in JSON format', data: null, originalError: { message: '' } });
            }

            if (clietns[notifications.to] && clietns[notifications.to].readyState === 1) {
                clietns[notifications.to].send(JSON.stringify(notifications));
                console.log(`===== NotificationController.push | id ${notifications.to} -> sent successful`);
                return res.json({ code: 200, message: '', data: { Status: 0, Message: 'successful' } });
            }
            console.log(`===== NotificationController.push | id ${notifications.to} -> error : client id not found`);
            return res.json({ code: 200, message: '', data: { Status: 1, Message: 'client id not found' } });
        } catch (error) {
            console.log(error);
            return res.json({ code: 'SYS001', message: 'fail.', data: null, originalError: { message: error.message } });
        }
    },
    pushAll: async (req, res) => {
        console.log('===== NotificationController.pushAll =====');
        try {
            console.log('===== socket.sendAll =====');
            let socket = req.app.get('socket');
            const data = require('../../data');
            socket.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify(data));
                }
            });
            res.json({ code: 200, message: '', data: { Status: 0, Message: '' } });
        } catch (error) {
            console.log(error);
            res.json({ code: 'SYS001', message: 'fail.', data: null, originalError: { message: error.message } });
        }
    },
};

module.exports = NotificationController;
