/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/28
 * @update 2020/10/28
 */
'use strict';
const device = require('../models/device');

const DeviceService = {
    add: async (options) => {
        console.log('===== DeviceService.add -> options: =====');
        return await new device(options).save().catch((e) => {
            console.log('===== DeviceService.add -> error: ', e.message);
            return { code: e.code || '', message: e.message };
        });
    },
    delete: async (options) => {
        console.log('===== DeviceService.delete -> options: =====');
        return new Promise(async (resolve, reject) => {
            device.deleteMany(options, (e) => {
                if (e) {
                    console.log(e.message);
                    return reject({ code: e.code || '', message: e.message });
                }
                return resolve('success');
            });
        });
    },
    find: async (options) => {
        console.log('===== DeviceService.find -> options: =====');
        return await device.find(options).catch(e => {
            console.log('===== DeviceService.add -> error: ', e.message);
            return { code: e.code || '', message: e.message };
        });
    },
};

module.exports = DeviceService;
