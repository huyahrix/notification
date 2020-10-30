/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/27
 * @update 2020/10/27
 */
'use strict';
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
        default: 'N',
    },
    AppID: {
        type: String,
        required: true,
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
        default: 0
    },
    type: {
        type: String
    }
}, { timestamps: true });

notification.post('save', async function (doc, next) {
    require('../services/NotificationService').push(doc).catch(e => winston.error(e));
    next();
});
module.exports = mongoose.model('notification', notification);
