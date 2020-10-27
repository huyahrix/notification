/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/27 08:48
 * @update 2020/10/27 08:48
 */
'use strict';
const _ = require('underscore');
const Utils = require('../utils');
const ErrorSystem = require('../errors/system');
const NotificationService = require('../services/NotificationService');

const ErrorMessage = Object.assign({
    NOTIFICATION_ADD_FAIL:              { code: 'NT001', message: 'Do not add successful' },
    NOTIFICATION_EDIT_FAIL:             { code: 'NT002', message: 'Do not edit successful' },
    NOTIFICATION_DEL_FAIL:              { code: 'NT003', message: 'Do not delete successful' },
    NOTIFICATION_NOT_FOUND:             { code: 'NT004', message: 'Not found' },

    NOTIFICATION_ID_REQUIRED:           { code: 'NT005', message: 'The id is required' },
    NOTIFICATION_TITLE_REQUIRED:        { code: 'NT006', message: 'The title is required' },
    NOTIFICATION_CONSUMER_REQUIRED:     { code: 'NT007', message: 'The consumer is required' },
    NOTIFICATION_DATA_REQUIRED:         { code: 'NT008', message: 'The data is required' },
    NOTIFICATION_TYPE_REQUIRED:         { code: 'NT008', message: 'The notification type is required' },
}, ErrorSystem);

module.exports = {
    add: async (req, res) => {
        console.log('===== NotificationController.add => START =====');
        const params = req.body;

        if (!params.data) {
            return res.badRequest(ErrorMessage.NOTIFICATION_DATA_REQUIRED);
        }
        if (!_.isArray(params.data) && !Utils.parseArray(params, 'data')) {
            return res.badRequest(ErrorMessage.SYSTEM_JSON_FORMAT_FAIL);
        }

        NotificationService.create(params.data);
        //return res.ok({ Status: 0, Message: 'success' });
        return res.json({ code: 200, message: '', data: { Status: 0, Message: 'successful' } });
    },
};


