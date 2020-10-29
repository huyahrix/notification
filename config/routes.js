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
const policies = require('../api/policies');

const SocketController = require('../api/controllers/SocketController');
const SMSController = require('../api/controllers/SMSController');
const NotificationController = require('../api/controllers/NotificationController');
const DeviceController = require('../api/controllers/DeviceController');
const AppController = require('../api/controllers/AppController');
const AuthController = require('../api/controllers/AuthController');

/************************* auth *************************/
router.get('*/auth/token', policies.secretAuth, AuthController.getToken);
router.put('*/auth/check', multer().array('formData'), policies.secretAuth, AuthController.check);

/************************* app *************************/
router.post('*/app/add', multer().array('formData'), policies.tokenAuth, AppController.add);

/************************* device *************************/
router.post('*/device/add', multer().array('formData'), policies.tokenAuth, DeviceController.add);

/************************* notification *************************/
router.post('*/notification/add', multer().array('formData'), policies.tokenAuth, NotificationController.add);

/************************* socket *************************/
router.put('*/socket/push', multer().array('formData'), SocketController.push);
router.put('*/socket/push-all', multer().array('formData'), SocketController.pushAll);

/************************* sms *************************/
router.post('*/sms/send', multer().array('formData'), policies.tokenAuth, SMSController.send);

module.exports = router;
