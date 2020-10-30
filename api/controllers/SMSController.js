/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-09
 * @update 2020-09-09
 */
'use strict';
const SMSService = require('../services/SMSService');

const SMSController = {
    /**
     @api {post} /sms/send   01. send sms message
     @apiName send
     @apiDescription Author: ngochuy
     @apiVersion 1.0.0
     @apiGroup sms

     @apiParam {String}    phone    The phone is required
     @apiParam {String}    sms      The sms is required
     @apiParam {String}    bid      The bid is required

     @apiSuccessExample Success-Response
     HTTP/1.1 200 ok
     {
        "code": 200,
        "message": "",
        "data": {
            "Status": 0,
            "Message": "successful"
        }
     }

     @apiErrorExample Error-Response
     HTTP/1.1 400 Bad request
     { "code": 'ERR001', "message": 'The phone is requied. ', "data": null }
     { "code": 'ERR002', "message": 'The sms is requied. ', "data": null }
     { "code": 'ERR003', "message": 'The bid is requied. ', "data": null }
    */
    send: async (req, res) => {
        winston.info('===== SMSController.send =====');
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

        params.user = config.smsUser;
        params.password = config.smsApiPass;
        params.from = config.smsFrom;
        params.json = config.smsJson;

        SMSService.send(params);
        return res.json({ code: 200, message: '', data: { Status: 0, Message: 'successful' } });
    },
};

module.exports = SMSController;
