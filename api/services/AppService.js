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
        console.log('===== AppService.add -> options: =====');
        return await new app(options).save().catch((e) => {
            console.log('===== AppService.add -> error: ', e.message);
            return { code: e.code || '', message: e.message };
        });
    },
    delete: async (options) => {
        console.log('===== AppService.delete -> options: =====');
        return new Promise(async (resolve, reject) => {
            app.deleteMany(options, (e) => {
                if (e) {
                    console.log(e.message);
                    return reject({ code: e.code || '', message: e.message });
                }
                return resolve('success');
            });
        });
    },
    find: async (options) => {
        console.log('===== AppService.find -> options: =====');
        return await app.find(options).catch(e => {
            console.log('===== AppService.find -> error: ', e.message);
            return { code: e.code || '', message: e.message };
        });
    },
};

module.exports = AppService;
