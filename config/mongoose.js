const mongoose = require('mongoose');
const config = require('./config');

// connect to mongo db
const mongoUri = config.mongo.host + '/' + config.mongo.database;
mongoose.connect(mongoUri, { keepAlive: 1, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).catch(e => console.log(e));

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

