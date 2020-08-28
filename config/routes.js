/**
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer();

const NotificationController = require('../api/controllers/NotificationController');

let initRoutes = (app) => {
    router.put('*/notification/push', upload.array('formData'), NotificationController.push);
    router.put('*/notification/push-all', NotificationController.pushAll);
    return app.use('/', router);
};

module.exports = initRoutes;
