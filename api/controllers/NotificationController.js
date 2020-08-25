'use strict';

const NotificationController = {
    push: async (req, res) => {
        console.log('===== NotificationController.push =====');
        try {
            let socket = req.app.get('socket')
            function sendAll(data) {
                console.log('===== socket.sendAll =====');
                socket.clients.forEach((client) => {
                    if (client.readyState === 1) {
                        client.send(JSON.stringify(data));
                    }
                });
            }
            const data = require('../../data')
            sendAll(data);
            res.json({
                code: 200,
                message: '',
                data: {
                    Status: 0,
                    Message: ''
                }
            })
        } catch (error) {
            console.log(error);
            res.json({
                code: 'SYS001',
                message: 'fail.',
                data: null,
                originalError: {
                    message: error.message
                }
            })
        }
    },
}

module.exports = NotificationController
