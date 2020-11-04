/**
 * @copyright 2020 © DigiNet
 * @author ngochuy
 * @create 2020/10/29
 * @update 2020/10/29
 */
'use strict';

class mongooseError extends Error {
    constructor(args){
        super(args);
        this.code = 'mongooseError';
        this.message = args.message;
    }
}

class validationError extends Error {
    constructor(args){
        super(args);
        this.code = 'ValidationError';
        this.message = args.message;
    }
}

global.mongooseError = mongooseError;
global.validationError = validationError;

module.exports = { mongooseError, validationError };
