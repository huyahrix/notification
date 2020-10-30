/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/28
 * @update 2020/10/28
 */
'use strict';
const app = require('../models/app');

const AppService = {
    add: async (options) => {
        winston.info('===== AppService.add -> options: =====');
        return await new app(options).save().catch((e) => {
            winston.error(util.format('===== AppService.add -> error: ', e));
            return { code: e.code || '', message: e.message };
        });
    },
    delete: async (options) => {
        winston.info('===== AppService.delete -> options: =====');
        return new Promise(async (resolve, reject) => {
            app.deleteMany(options, (e) => {
                if (e) {
                    winston.error(util.format('===== AppService.add -> error: ', e));
                    return reject({ code: e.code || '', message: e.message });
                }
                return resolve('success');
            });
        });
    },
    find: async (options) => {
        winston.info('===== AppService.find -> options: =====');
        return await app.find(options).catch(e => {
            winston.error(util.format('===== AppService.find -> error: ', e));
            return { code: e.code || '', message: e.message };
        });
    },
};

module.exports = AppService;
