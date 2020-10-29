/**
 * @copyright 2019 © DigiNet
 * @author rocachien
 * @create 2019/04/24 17:24
 * @update 2019/04/24 17:24
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
        console.log('===== policies.secretAuth -> warn: Authentication secret are not matching', secret);
        return res.badRequest({code: 'SYS003', message: 'Authentication secret are not matching'});
    }

    next();
};
