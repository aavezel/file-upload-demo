const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const getFileRouter = require("./routes/file");

const app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/file', getFileRouter);



module.exports = app;
