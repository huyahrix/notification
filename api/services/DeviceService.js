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
        winston.info('===== DeviceService.add -> options: =====');
        return await new device(options).save().catch((e) => {
            winston.error(util.format('===== DeviceService.add -> error: ', e.message));
            return { code: e.code || '', message: e.message };
        });
    },
    delete: async (options) => {
        winston.info('===== DeviceService.delete -> options: =====');
        return new Promise(async (resolve, reject) => {
            device.deleteMany(options, (e) => {
                if (e) {
                    winston.info(util.format('===== DeviceService.delete -> error', e.message));
                    return reject({ code: e.code || '', message: e.message });
                }
                return resolve('success');
            });
        });
    },
    find: async (options) => {
        winston.info('===== DeviceService.find -> options: =====');
        return await device.find(options).catch(e => {
            winston.error(util.format('===== DeviceService.add -> error: ', e));
            return { code: e.code || '', message: e.message };
        });
    },
};

module.exports = DeviceService;
