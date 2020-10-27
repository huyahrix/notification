/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2019/10/12 17:24
 * @update 2019/10/12 17:24
 */
'use strict';

/**
* @param params Object
* @param key    String
**/
const parseObject = (params, key = '') => {
    try {
        params[key] = JSON.parse(params[key]);
        return true;
    } catch (e) {
        if (e) {
            // Tracking
            TrackingService.trackingSystem('util/parseObject', 'ERROR', e);
            sails.log.warn('===== Utils.parseObject -> error: ', e.message, '\nparams: ', require('util').inspect(params));
            return false;
        }
    }
};

module.exports = parseObject;
