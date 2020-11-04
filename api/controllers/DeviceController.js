/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/28
 * @update 2020/10/28
 */
'use strict';
const Joi = require('joi');
const ErrorSystem = require('../errors/system');
const DeviceService = require('../services/DeviceService');
const ErrorMessage = Object.assign({
    DEVICE_ADD_FAIL: { code: 'DV001', message: 'Do not add successful' },
    DEVICE_EDIT_FAIL: { code: 'DV002', message: 'Do not edit successful' },
    DEVICE_DEL_FAIL: { code: 'DV003', message: 'Do not delete successful' },
    DEVICE_NOT_FOUND: { code: 'DV004', message: 'Not found' },
    DEVICE_ID_REQUIRED: { code: 'DV005', message: 'The id is required' },
    DEVICE_MODEL_REQUIRED: { code: 'DV006', message: 'The model is required' },
    DEVICE_TOKEN_REQUIRED: { code: 'DV007', message: 'The token is required' },
    DEVICE_IS_EXITED: { code: 'DV008', message: 'The device is exited' },
    DEVICE_LANGUAGE_REQUIRED: { code: 'DV009', message: 'The language is required' },
    USERID_REQUIRED: { code: 'DV010', message: 'The UserID is required' },
}, ErrorSystem);

const DeviceController = {
    /**
      @api {put} /device/add 01. create device
      @apiName add
      @apiVersion 1.0.0
      @apiGroup device

      @apiHeader {String} token String of token is required.

      @apiParam {String} os              The os of device is required. E.g: ['WEB', 'IOS', 'ANDROID']. Default: ''
      @apiParam {String} md              The model of os is required. E.g: ['Opera', 'Chrome', 'Safari', 'Firefox', 'MSIE', 'unknown']. Default: unknown
      @apiParam {String} token           The token of device is required.
      @apiParam {String} AppID           The AppID is required.
      @apiParam {String} UserID          The UserID is required.
      @apiParam {String} language        The language is option. Default : '84'

      @apiSuccessExample {json} Success-Response:
      HTTP/1.1 200 OK
      {
            "code": 200,
            "message": "",
            "data": {
                "md": "unknown",
                "_id": "5f98faa5769d0a81040bc18e",
                "user": "LEMONADMIN",
                "os": "WINDOWS",
                "token": "5HbXMoSbQYGdPB6tz6rbbg==",
                "language": "84",
                "AppID": "DERP",
                "createdAt": "2020-10-28T04:59:17.945Z",
                "updatedAt": "2020-10-28T04:59:17.945Z",
                "__v": 0
            }
      }

      @apiErrorExample Error-Response:
      HTTP/1.1 400 Bad Request
      {"code": 'DV001', "message": 'Do not add successful'}
      {"code": 'DV006', "message": 'The user is required'}
      {"code": 'DV007', "message": 'The token is required'}
      {"code": 'SYS009', "message": 'The data is not in list'}
      {"code": 'DV008', "message": 'The device is exited'}
    */
    add: async (req, res) => {
        winston.info('===== DeviceController.add => START =====');
        const params = req.body;
        params.user = params.UserID;

        const Schema = Joi.object({
            md: Joi.string().valid('Opera', 'Chrome', 'Safari', 'Firefox', 'MSIE', 'unknown').required(),
            token: Joi.string().required(),
            language: Joi.string().valid('01', '84').required(),
            os: Joi.string().valid('WEB', 'IOS', 'ANDROID', 'WINDOWS').required(),
            AppID: Joi.string().required(),
            UserID: Joi.string().required(),
        }).unknown(true);

        const { error } = Schema.validate(params);
        if (error) {
            winston.warn('===== DeviceController.add -> warn: ', error.message );
            return res.badRequest(new validationError(error));
        }

        await DeviceService.delete({ user: params.user, os: params.os });

        const result = await DeviceService.add(params);
        if (!result) {
            return res.badRequest(ErrorMessage.DEVICE_ADD_FAIL);
        }
        if (result.code && result.message) {
            return res.badRequest(result);
        }
        return res.ok(result);
    },
    /**
     @api {put} /device/edit 02. edit a device
     @apiName edit
     @apiVersion 1.0.0
     @apiGroup device

     @apiHeader {String} token String of token is required.

     @apiParam {String} id              The ID of Device is required.
     @apiParam {String} md              The type of os is required.
     @apiParam {String} os              The os of device is required. E.g: ['WEB', 'IOS', 'ANDROID'].
     @apiParam {String} token           The token of device is required.
     @apiParam {String} AppID           The AppID is required.
     @apiParam {String} UserID          The UserID is required.

     @apiSuccessExample {json} Success-Response:
     HTTP/1.1 200 OK
     {}

     @apiErrorExample Error-Response:
     HTTP/1.1 500 Internal Server Error
     {'code': 'SYS001','message': 'Internal Server Error!'}
     HTTP/1.1 400 Bad Request
     {'code': 'DV006','message': 'ID is required'}
     {'code': 'DV004','message': 'Not found any Device'}
     {'code': 'DV002','message': 'Do not edit successful'}
    */
    edit: (req, res) => {
        sails.log.info('===== DeviceController.edit => START =====');
        const params = req.allParams();

        if (!params.id) {
            return res.badRequest(ErrorMessage.DEVICE_ID_REQUIRED);
        }

        const Schema = Joi.object({
            md: Joi.string().valid('Opera', 'Chrome', 'Safari', 'Firefox', 'MSIE', 'unknown'),
            token: Joi.string(),
            language: Joi.string().valid('01', '84'),
            os: Joi.string().valid('WEB', 'IOS', 'ANDROID', 'WINDOWS'),
            AppID: Joi.string(),
            UserID: Joi.string(),
        }).unknown(true);

        const { error } = Schema.validate(params);
        if (error) {
            winston.warn('===== DeviceController.add -> warn: ', error.message );
            return res.badRequest({ code: 'ValidationError', message: error.message });
        }

        DeviceService.get({ id: params.id }, (error, device) => {
            if (error) {
                // Tracking
                TrackingService.trackingSystem('DeviceController', 'ERROR', error);
                return res.badRequest(error);
            }

            if (!device || !device.id) {
                return res.badRequest(ErrorMessage.DEVICE_NOT_FOUND);
            }

            device.os = params.os ? params.os : device.os;
            device.token = params.token ? params.token : device.token;

            DeviceService.edit({ id: params.id }, device, (e) => {
                if (e) {
                    sails.log.warn('===== Edit device error: ' + JSON.stringify(e));
                    // Tracking
                    TrackingService.trackingSystem('DeviceController', 'ERROR', e);
                    return res.badRequest(e);
                }

                return res.ok(device);
            });
        });
    },
};
module.exports = DeviceController;
