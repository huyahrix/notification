/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer();

const WebSocketController   = require('../api/controllers/WebSocketController');
const SMSController         = require('../api/controllers/SMSController');

const initRoutes = (app) => {
    router.put('*/socket/push', upload.array('formData'), WebSocketController.push);
    router.put('*/socket/push-all', WebSocketController.pushAll);

    router.put('*/sms/send', SMSController.send);

    app.use('/', router);
};

module.exports = initRoutes;
