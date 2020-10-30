/**
 * @copyright 2018 © Spiritlabs
 * @author phamhien
 * @create 2019/01/02 19:14
 * @update 2019/01/04
 */
'use strict';
const axios = require('axios');
const app = require('../models/app');
const fcmHost = 'https://fcm.googleapis.com/fcm/send';

const FirebaseService = {
    /* one time one request */
    push: async (data, AppID) => {
        winston.info('===== FirebaseService.push =====');
        const authFCM = await app.find({ code: AppID });

        if (!authFCM || !authFCM[0] || !authFCM[0].authFCM) {
            winston.warn(`===== FirebaseService.push -> warn: AuthFCM is undefined {code: '${AppID}'}`);
            return false;
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + authFCM[0].authFCM
        };

        const config = {
            url: fcmHost,
            method: 'post',
            headers: headers,
            data: JSON.stringify(data)
        };

        axios(config)
            .then((response) => {
                winston.info(JSON.stringify(response.data));
            })
            .catch((error) => {
                winston.error(util.format('===== FirebaseService.push -> error', error));
            });
    }
};
module.exports = FirebaseService;
