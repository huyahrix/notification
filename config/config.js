/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */

require('dotenv').config();
const config = {
    env: process.env.NODE_ENV,
    port: process.env.NODE_PORT,
    apiURL: process.env.API_URL,
    secret: process.env.SECRET,
    smsUser: process.env.SMS_USER,
    smsApiPass: process.env.SMS_API_PASSWORD,
    smsWebPass: process.env.SMS_WEB_PASSWORD,
    smsFrom: process.env.SMS_FROM,
    smsJson: process.env.SMS_JSON,
    mongo: {
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        database: process.env.MONGO_DATABASE
    }
};

module.exports = config;
