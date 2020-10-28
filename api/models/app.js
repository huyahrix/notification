/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/27
 * @update 2020/10/27
 */
'use strict';
const mongoose = require('mongoose');

const app = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        default: ''
    },
    index: {
        type: Number,
        default: 0
    },
    icon: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0,
    },
    openIOS: {
        type: String
    },
    openAndroid: {
        type: String
    },
    setting: {
        type: Object,
        default: {}
    },
    permission: {
        type: Object,
        default: {}
    },
    authFCM: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('app', app);
