/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/30
 * @update 2020/10/30
 */
'use strict';
const ErrorSystem = require('../errors/system');

module.exports = (req, res, next) => {
    // Check token required
    const secret = req.headers.secret;
    if (!secret) {
        return res.badRequest(ErrorSystem.SYSTEM_SECRET_REQUIRE);
    }
    if (secret !== config.secret) {
        winston.warn('===== policies.secretAuth -> warn: Authentication secret are not matching', secret);
        return res.badRequest({code: 'SYS003', message: 'Authentication secret are not matching'});
    }

    next();
};
