/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/29
 * @update 2020/10/29
 */
'use strict';

const secretAuth = require('./secretAuth');
const tokenAuth = require('./tokenAuth');

const policies = {
    secretAuth  : secretAuth,
    tokenAuth   : tokenAuth,
};

module.exports = policies;
