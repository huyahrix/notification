/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/29
 * @update 2020/10/29
 */
'use strict';
const mongoose = require('mongoose');

const auth = new mongoose.Schema({
    expiredAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('auth', auth);
