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
const userCtrl = require('../api/controllers/user.controller');
const NotificationController = require('../api/controllers/NotificationController');

async function insert(req, res) {
    let user = await userCtrl.insert(req.body);
    res.json(user);
  }

/************************* socket *************************/
router.put('*/socket/push', multer().array('formData'), WebSocketController.push);
router.put('*/socket/push-all', multer().array('formData'), WebSocketController.pushAll);

/************************* sms *************************/
router.post('*/sms/send', multer().array('formData'), SMSController.send);

/************************* notification *************************/
router.post('*/notification/add', multer().array('formData'), NotificationController.add);

router.get('/user', insert);

module.exports = router;
