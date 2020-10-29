/**
 * @copyright
 * @author ngochuy
 * @create 2020-09-05
 * @update 2020-09-05
 */
'use strict';
const express = require('express');
const httpError = require('http-errors');
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(express.static('assets'));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(function (req, res, next) {
    res.ok = (data) => {
        return res.json({ code: 200, message: '', data: data });
    };
    res.badRequest = (data) => {
        return res.json(Object.assign({ code: 'ERROR', message: '' }, data, { data: null }));
    };
    next();
});


// API router
app.use('/api/', routes);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
global._ = require('underscore');
global.config = require('./config');

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new httpError(404);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

    // customize Joi validation errors
    if (err.isJoi) {
        err.message = err.details.map(e => e.message).join('; ');
        err.status = 400;
    }

    res.status(err.status || 500).json({code: err.code || 'ERROR', message: err.message, data: null});
    next(err);
});

module.exports = app;
