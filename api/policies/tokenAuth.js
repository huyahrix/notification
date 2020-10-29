/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/29
 * @update 2020/10/29
 */
'use strict';
const moment = require('moment');
const Utils = require('../utils');
const ErrorSystem = require('../errors/system');
const DeviceService = require('../services/DeviceService');

module.exports = async (req, res, next) => {
    // Check token required
    const token = req.headers.token || null;
    if (!token || token.length < 30) {
        console.log('===== policies.tokenAuth -> warn: ', ErrorSystem.SYSTEM_TOKEN_REQUIRE.message);
        return res.badRequest(ErrorSystem.SYSTEM_TOKEN_REQUIRE);
    }
    // Check token validated
    const authData = Utils.decryptJWT(token);
    if (!authData || (!authData.id && !authData._id)) {
        console.log('===== policies.tokenAuth -> warn: ', ErrorSystem.SYSTEM_TOKEN_WRONG.message);
        return res.badRequest(ErrorSystem.SYSTEM_TOKEN_WRONG);
    }
    // Check expired time
    const expiredAt = moment().diff(authData.expiredAt);
    if (expiredAt >= 0) {
        console.log('===== policies.tokenAuth -> warn: ', ErrorSystem.SYSTEM_TOKEN_EXPIRED.message);
        DeviceService.del({ user: authData.user.UserAccount, authToken: token });
        return res.badRequest(ErrorSystem.SYSTEM_TOKEN_EXPIRED);
    }
    return next();
};
