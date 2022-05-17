const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//import all routes
const auth = require('./routes/auth');
const product = require('./routes/product');

app.use('/api/v1', auth);
app.use('/api/v1', product)


module.exports = app;