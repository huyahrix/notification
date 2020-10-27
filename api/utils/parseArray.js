/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2019/04/24 17:24
 * @update 2019/04/24 17:24
 */
'use strict';

/**
* @param params Object
* @param key    String
**/
const parseArray = (params, key = '') => {
    if (!_.isArray(params[key])) {
        try {
            params[key] = JSON.parse(params[key]);
            if (!_.isArray(params[key])) {
                return false;
            }
            return true;
        } catch (e) {
            if (e) {
                // Tracking
                TrackingService.trackingSystem('util/parseArray', 'ERROR', e);
                sails.log.warn('===== Utils.parseArray -> error: ', e.message, '\nparams: ', require('util').inspect(params));
                return false;
            }
        }
    } else {
        return true;
    }
};

module.exports = parseArray;
