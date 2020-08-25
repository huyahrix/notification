/**
 */
const express = require('express');
const router = express.Router();
const NotificationController = require('../api/controllers/NotificationController');

let initRoutes = (app) => {
    router.put('/notification/push', NotificationController.push);
    return app.use('/', router);
};

module.exports = initRoutes;
