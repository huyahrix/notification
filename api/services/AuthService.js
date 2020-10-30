/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/30
 * @update 2020/10/30
 */
'use strict';
const auth = require('../models/auth');

const AuthService = {
    add: async (options) => {
        winston.info('===== AuthService.add -> options: =====');
        return await new auth(options).save().catch((e) => {
            winston.error(util.format('===== AuthService.add -> error: ', e));
            return { code: e.code || '', message: e.message };
        });
    },
};

module.exports = AuthService;
