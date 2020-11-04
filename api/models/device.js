/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/27
 * @update 2020/10/27
 */
'use strict';
const mongoose = require('mongoose');

const device = new mongoose.Schema({
    user: {
        type: String
    },
    os: {
        type: String,
    },
    md: {
        type: String,
        default: 'unknown'
    },
    language: {
        type: String
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    AppID: {
        type: String,
        required: true,
    },
}, { timestamps: true });

device.method('transform', function () {
    const obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('device', device);
