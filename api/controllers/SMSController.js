/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';

const SMSService = require('../services/SMSService');

const SMSController = {
    send: async (req, res) => {
        console.log('===== SMSController.send =====');
        const params = req.body;
        if (!params.phone) {
            return res.json({ code: 'ERR001', message: 'The phone is requied. ', data: null });
        }
        if (!params.sms) {
            return res.json({ code: 'ERR002', message: 'The sms is requied. ', data: null });
        }
        if (!params.bid) {
            return res.json({ code: 'ERR003', message: 'The bid is requied. ', data: null });
        }
        let config = req.app.get('config');

        params.user = config.smsUser;
        params.password = config.smsApiPass;
        params.from = config.smsFrom;
        params.json = config.smsJson;

        SMSService.send(params);
        return res.json({ code: 200, message: '', data: { Status: 0, Message: 'successful' } });
    },
};

module.exports = SMSController;
