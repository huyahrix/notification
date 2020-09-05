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

const NotificationController = require('../api/controllers/NotificationController');

const initRoutes = (app) => {
    router.put('*/notification/push', upload.array('formData'), NotificationController.push);
    router.put('*/notification/push-all', NotificationController.pushAll);

    app.use('/', router);
};

module.exports = initRoutes;
