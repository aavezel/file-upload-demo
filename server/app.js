const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');
const getFileRouter = require("./routes/file");

const {cors_option} = require("./config");
const cors = require('cors')

const app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors(cors_option));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/file', getFileRouter);



module.exports = app;
