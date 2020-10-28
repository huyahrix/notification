/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/28
 * @update 2020/10/28
 */
'use strict';
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
      @api {put} /device/add 01. Create device
      @apiName add
      @apiVersion 1.0.0
      @apiGroup Device

      @apiHeader {String} token String of token is required.

      @apiParam {String} os              The os of device is required. E.g: ['WEB', 'IOS', 'ANDROID']. Default: ''
      @apiParam {String} md              The model of os is required. E.g: ['Opera', 'Chrome', 'Safari', 'Firefox', 'MSIE', 'unknown']. Default: unknown
      @apiParam {String} token           The token of device is required.
      @apiParam {String} AppID           The AppID is options. Default : '',
      @apiParam {String} language        The language is required.

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
        console.log('===== DeviceController.add => START =====');
        const params = req.body;
        // const auth = Utils.auth(req);
        // params.user = auth && auth.user && auth.user.UserAccount ? auth.user.UserAccount : null;
        params.user = params.UserID;

        if (!params.md) {
            return res.badRequest(ErrorMessage.DEVICE_MODEL_REQUIRED);
        }
        if (!params.token) {
            return res.badRequest(ErrorMessage.DEVICE_TOKEN_REQUIRED);
        }
        if (!params.language) {
            return res.badRequest(ErrorMessage.DEVICE_LANGUAGE_REQUIRED);
        }
        if (['WEB', 'IOS', 'ANDROID', 'WINDOWS'].indexOf(params.os) === -1) {
            return res.badRequest(ErrorMessage.SYSTEM_ENUM_VALUE_FAIL);
        }
        if (['Opera', 'Chrome', 'Safari', 'Firefox', 'MSIE', 'unknown'].indexOf(params.md) === -1) {
            return res.badRequest(ErrorMessage.SYSTEM_ENUM_VALUE_FAIL);
        }

        //const param = { user: params.user, md: params.md, os: params.os, token: params.token, language: params.language, AppID: params.AppID, authToken: req.headers.token };

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
};
module.exports = DeviceController;
