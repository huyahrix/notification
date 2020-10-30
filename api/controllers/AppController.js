/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/30
 * @update 2020/10/30
 */
'use strict';
const Utils = require('../utils');
const ErrorSystem = require('../errors/system');
const AppService = require('../services/AppService');
const ErrorMessage = Object.assign({
    APP_ADD_FAIL:               {code: 'AP001', message: 'Do not add successful'},
    APP_EDIT_FAIL:              {code: 'AP002', message: 'Do not edit successful'},
    APP_DEL_FAIL:               {code: 'AP003', message: 'Do not delete successful'},
    APP_NOT_FOUND:              {code: 'AP004', message: 'Not found'},

    APP_ID_REQUIRED:            {code: 'AP005', message: 'The id is required'},
    APP_CODE_REQUIRED:          {code: 'AP006', message: 'The code is required'},
    APP_CODE_EXITED:            {code: 'AP007', message: 'The code is exited'},
}, ErrorSystem);

const AppController = {
    /**
     @api {put} /app/add 01. Add an app
     @apiName add
     @apiVersion 1.0.0
     @apiGroup App

     @apiHeader {String} token String of token is required.

     @apiParam {String} code            The code is required.
     @apiParam {String} name            The name is optional.
     @apiParam {String} icon            The icon is optional.
     @apiParam {Number} index           The sort index is optional.
     @apiParam {Number} status          The status is optional. Value in: [0, 1, 2]. Default: 1
     @apiParam {String} openIOS         The bundle of IOS when open app is optional.
     @apiParam {String} openAndroid     The schema of Android when open app is optional.
     @apiParam {JSON}   setting         The setting is optional.
     @apiParam {JSON}   permission      The permission is optional.

     @apiSuccessExample {json} Success-Response:
     HTTP/1.1 200 OK
     {
         "code": 200,
         "message": "",
         "data": {
             "id": 2,
             "code": "code",
             "name": "name",
             "index": 1,
             "icon": "icon",
             "status": 1,
             "openIOS": "openIOS",
             "openAndroid": "openAndroid",
             "setting": {},
             "permission": {}
         }
     }

     @apiErrorExample Error-Response:
     HTTP/1.1 400 Bad Request
     {code: 'AP001', message: 'Do not add successful'}
     {code: 'AP006', message: 'The code is required'}
     {code: 'AP007', message: 'The code is exited'}
     {code: 'SYS010', message: 'The data is not number'}
     {code: 'SYS008', message: 'The data is not in JSON format'}
     {code: 'SYS009', message: 'The data is not in list'}
    */
    add: async (req, res) => {
        winston.info('===== AppController.add => START =====');
        const params = req.body;

        if (!params.code) {
            return res.badRequest(ErrorMessage.APP_CODE_REQUIRED);
        }
        if (params.index && !Utils.isInt(params.index)) {
            return res.badRequest(ErrorMessage.SYSTEM_NOT_INTEGER_FAIL);
        }
        if (params.status && ['0','1','2'].indexOf(params.status) < 0) {
            return res.badRequest(ErrorMessage.SYSTEM_ENUM_VALUE_FAIL);
        }
        if (params.setting && !Utils.isJsonString(params.setting)) {
            return res.badRequest(ErrorMessage.SYSTEM_JSON_FORMAT_FAIL);
        }
        if (params.permission && !Utils.isJsonString(params.permission)) {
            return res.badRequest(ErrorMessage.SYSTEM_JSON_FORMAT_FAIL);
        }
        if (!params.status) {
            params.status = 1;
        }
        if (params.id) {
            delete params.id;
        }

        const result = await AppService.add(params);
        if (!result) {
            return res.badRequest(ErrorMessage.APP_ADD_FAIL);
        }
        if (result.code && result.message) {
            return res.badRequest(result);
        }
        return res.ok(result);
    },
};
module.exports = AppController;
