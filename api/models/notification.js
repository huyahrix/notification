/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/27
 * @update 2020/10/27
 */
// 'use strict';
// const PushNotiService = require('../services/PushNotiService');
const mongoose = require('mongoose');

const notification = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    titleE: {
        type: String,
        required: true
    },
    channel: {
        type: String
    },
    body: {
        type: String
    },
    bodyE: {
        type: String
    },
    sender: {
        type: String
    },
    consumer: {
        type: String
    },
    payload: {
        type: Object
    },
    extra: {
        type: Object
    },
    URL: {
        type: String
    },
    read: {
        type: String,
    },
    AppID: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
    },
    action: {
        type: String
    },
    clearBadge: {
        type: Number,
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('notification', notification);
