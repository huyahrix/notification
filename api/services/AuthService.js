/**
 * @copyright 2019 © DigiNet
 * @author rocachien
 * @create 2019/04/24 17:24
 * @update 2019/04/24 17:24
 */
'use strict';
const auth = require('../models/auth');

const AuthService = {
    add: async (options) => {
        console.log('===== AuthService.add -> options: =====');
        return await new auth(options).save().catch((e) => {
            console.log('===== AuthService.add -> error: ', e.message);
            return { code: e.code || '', message: e.message };
        });
    },
};

module.exports = AuthService;
