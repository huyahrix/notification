/**
 * @copyright 2019 © DigiNet
 * @author rocachien
 * @create 2019/04/24 17:24
 * @update 2019/04/24 17:24
 */
'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const decrypt = (text) => {
    const key = crypto.createDecipher('aes-256-cbc', config.secret + '@^1#');
    const str = key.update(text, 'hex', 'utf8');

    return str + key.final('utf8');
};

const encrypt = (text) => {
    const key = crypto.createCipher('aes-256-cbc', config.secret + '@^1#');
    const str = key.update(text, 'utf8', 'hex');

    return str + key.final('hex');
};

const encryptJWT = (tokenData, expiry) => {
    expiry = expiry ? expiry : '30d';

    return jwt.sign(tokenData, config.secret + '@!2#', { algorithm: 'HS256', expiresIn: expiry});
};

const decryptJWT = (tokenData) => {
    try {
        return jwt.verify(tokenData, config.secret + '@!2#');
    } catch (e) {
        winston.error(util.format('Token Error: ' + e));
    }
};

module.exports = {
    decrypt: decrypt,
    encrypt: encrypt,
    decryptJWT: decryptJWT,
    encryptJWT: encryptJWT,
};
