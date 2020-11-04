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

        return await new device(options).save()
            .then(result => {
                return result.transform();
            })
            .catch((err) => {
                winston.error(util.format('DeviceService.add -> error: ', err));
                return new mongooseError(err);
            });
    },
    delete: async (options) => {
        winston.info('===== DeviceService.delete -> options: =====');

        return new Promise(async (resolve, reject) => {
            device.deleteMany(options, (err) => {
                if (err) {
                    winston.error(util.format('DeviceService.delete -> error', err));
                    return reject(err);
                }
                return resolve('success');
            });
        }).catch(error => {
            return new mongooseError(error);
        });
    },
    find: async (options) => {
        winston.info('===== DeviceService.find -> options: =====');

        return await device.find(options)
            .then(result => {
                return result.transform();
            })
            .catch(err => {
                winston.error(util.format('DeviceService.find -> error: ', err));
                return new mongooseError(err);
            });
    },
};

module.exports = DeviceService;
