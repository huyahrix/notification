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
};

module.exports = config;
