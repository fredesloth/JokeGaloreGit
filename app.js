"use strict";


const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));


const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(config.mongodb, {useNewUrlParser: true});


const jokeRouter = require('./routes/joke');
app.use('/api', jokeRouter);


const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app;