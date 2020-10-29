/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/29
 * @update 2020/10/29
 */
'use strict';
const parseArray = require('./parseArray');
const parseObject = require('./parseObject');
const encryption = require('./encryption');

const Utils = {
    parseArray  : parseArray,
    parseObject : parseObject,
    decrypt     : encryption.decrypt,
    encrypt     : encryption.encrypt,
    decryptJWT  : encryption.decryptJWT,
    encryptJWT  : encryption.encryptJWT,
};

module.exports = Utils;
