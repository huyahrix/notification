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

const WebSocketController = require('../api/controllers/WebSocketController');
const SMSController = require('../api/controllers/SMSController');
const NotificationController = require('../api/controllers/NotificationController');
const DeviceController = require('../api/controllers/DeviceController');
const AppController = require('../api/controllers/AppController');

/************************* socket *************************/
router.put('*/socket/push', multer().array('formData'), WebSocketController.push);
router.put('*/socket/push-all', multer().array('formData'), WebSocketController.pushAll);

/************************* sms *************************/
router.post('*/sms/send', multer().array('formData'), SMSController.send);

/************************* notification *************************/
router.post('*/notification/add', multer().array('formData'), NotificationController.add);

/************************* device *************************/
router.post('*/device/add', multer().array('formData'), DeviceController.add);

/************************* app *************************/
router.post('*/app/add', multer().array('formData'), AppController.add);

module.exports = router;
