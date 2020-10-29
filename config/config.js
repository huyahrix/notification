/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
const Joi = require('joi');
require('dotenv').config();

// define validation for all the env vars
const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid(...['development', 'production', 'test', 'provision']).default('development'),
    SERVER_PORT: Joi.number().default(8080),
    JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),
    MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
    MONGO_PORT: Joi.number().default(27017)
}).unknown()
    .required();

const { error, value } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: value.NODE_ENV,
    port: value.NODE_PORT,
    apiURL: value.API_URL,
    secret: value.JWT_SECRET,
    smsUser: value.SMS_USER,
    smsApiPass: value.SMS_API_PASSWORD,
    smsWebPass: value.SMS_WEB_PASSWORD,
    smsFrom: value.SMS_FROM,
    smsJson: value.SMS_JSON,
    mongo: {
        host: value.MONGO_HOST,
        port: value.MONGO_PORT,
        database: value.MONGO_DATABASE
    }
};

module.exports = config;
