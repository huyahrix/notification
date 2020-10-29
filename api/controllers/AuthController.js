/**
 * @copyright 2019 © DigiNet
 * @author ngochuy
 * @create 2019/04/24 17:24
 * @update 2019/04/24 17:24
 */
'use strict';
const moment = require('moment');
const Utils = require('../utils');
const ErrorSystem = require('../errors/system');
const AuthService = require('../services/AuthService');
const ErrorMessage = Object.assign({
    AUTH_ADD_FAIL:              {code: 'AU001', message: 'Do not add new successful'},
    AUTH_EDIT_FAIL:             {code: 'AU002', message: 'Do not edit successful'},
    AUTH_DEL_FAIL:              {code: 'AU003', message: 'Do not delete successful'},
    AUTH_NOT_FOUND:             {code: 'AU004', message: 'Not found'},
    AUTH_COI_TOKEN_REQUIRED:    {code: 'AU005', message: 'The coi token is required'},
    AUTH_USER_ID_REQUIRED:      {code: 'AU006', message: 'The user id is required'},
    AUTH_TOKEN_REQUIRED:        {code: 'AU007', message: 'The token is required'},
    AUTH_TOKEN_INVALID:         {code: 'AU008', message: 'The token invalid'},
    AUTH_ID_REQUIRED:           {code: 'AU009', message: 'The authentication id is required'},
    AUTH_LINK_FAIL:             {code: 'AU010', message: 'Redirect authentication fail'},
}, ErrorSystem);

module.exports = {
    /**
     @api {get} /auth/token 01. Get token
     @apiName getToken
     @apiVersion 1.0.0
     @apiGroup Authentication

     @apiHeader {String} secret String of secret is required. Default: ?????

     @apiSuccessExample {json} Success-Response:
     HTTP/1.1 200 OK
     {
        "code": 200,
        "message": "",
        "data": {
            "auth": {
                "id": "5f9a63cad6ffd404636be9f6",
                "createdAt": "2020-10-29T06:40:10.821Z",
                "updatedAt": "2020-10-29T06:40:10.821Z",
                "expiredAt": "2020-11-08T06:40:10.819Z"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOWE2M2NhZDZmZmQ0MDQ2MzZiZTlmNiIsImNyZWF0ZWRBdCI6IjIwMjAtMTAtMjlUMDY6NDA6MTAuODIxWiIsInVwZGF0ZWRBdCI6IjIwMjAtMTAtMjlUMDY6NDA6MTAuODIxWiIsImV4cGlyZWRBdCI6IjIwMjAtMTEtMDhUMDY6NDA6MTAuODE5WiIsImlhdCI6MTYwMzk1MzYxMCwiZXhwIjoxNjA2NTQ1NjEwfQ.3dQt_Jpmhopuo_D1M_NqO-KOLWVNPRnbHXIvWTzU_Ms"
        }
     }

     @apiErrorExample Error-Response:
     HTTP/1.1 500 Internal Server Error
     {code: 'SYS001', message: 'Server error'}

     HTTP/1.1 403 Forbidden
     {code: 'AU001', message: 'Do not add new successful'}
     {code: 'AU004', message: 'Not found'}
     {code: 'AU005', message: 'The token is required'}
     {code: 'AU006', message: 'The user id much a number'}
    */
    getToken: async(req, res) => {
        console.log('===== AuthController.getToken =====');

        const expire = moment().add(10, 'days').toDate(); /* 10d */
        const tkData = {expiredAt: expire};
        let authData = await AuthService.add(tkData);

        authData = JSON.parse(JSON.stringify(authData));
        const token = Utils.encryptJWT(authData);
        return res.ok({auth: authData, token: token});
    },
    /**
     @api {put} /auth/check 02. Check token
     @apiName check
     @apiVersion 1.0.0
     @apiGroup Authentication

     @apiHeader {String} secret String of secret is required

     @apiParam {String} token  String of token is required.

     @apiSuccessExample {json} Success-Response:
     HTTP/1.1 200 OK
     {
        "code": 200,
        "message": "",
        "data": {
            "auth": {
                "_id": "5f9a640158741021b0bf3e51",
                "expiredAt": "2020-11-08T07:23:17.416Z",
                "createdAt": "2020-10-29T06:41:05.952Z",
                "updatedAt": "2020-10-29T06:41:05.952Z",
                "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjlhNjQwMTU4NzQxMDIxYjBiZjNlNTEiLCJleHBpcmVkQXQiOiIyMDIwLTExLTA4VDA3OjIzOjE3LjQxNloiLCJjcmVhdGVkQXQiOiIyMDIwLTEwLTI5VDA2OjQxOjA1Ljk1MloiLCJ1cGRhdGVkQXQiOiIyMDIwLTEwLTI5VDA2OjQxOjA1Ljk1MloiLCJfX3YiOjAsImlhdCI6MTYwMzk1NjE5NywiZXhwIjoxNjA2NTQ4MTk3fQ.irU6NbBVJIFPpEbRHyLymAD_UiuAL4B-2-mB52A54M4"
        }
     }

     @apiErrorExample Error-Response:
     HTTP/1.1 403 Forbidden
     {code: 'AU001', message: 'Do not add new successful'}
     {code: 'AU002', message: 'Do not edit successful'}
     {code: 'AU007', message: 'The token is required'}
     {code: 'AU008', message: 'The token invalid'}
     {code: 'AU009', message: 'The authentication id is required'}
    */
    check: async (req, res) => {
        console.log('===== AuthController.check =====');
        const params = req.body;

        if (!params.token || params.token.length < 30) {
            return res.badRequest(ErrorMessage.AUTH_TOKEN_REQUIRED);
        }

        const authData = Utils.decryptJWT(params.token);
        if (authData && (authData.id || authData._id)) {
            delete authData.iat;
            delete authData.exp;

            authData.expiredAt = moment().add(10, 'days').toDate(); /* 10d */
            const token = Utils.encryptJWT(authData);
            return res.ok({auth: authData, token: token });
        }
        console.log('===== AuthController.check -> warn: ', '{code: SYS003, message: Authentication token are not matching}');
        return res.badRequest(ErrorSystem.SYSTEM_TOKEN_WRONG);
    },
};
