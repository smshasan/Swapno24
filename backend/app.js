const express = require('express');
const session = require('express-session');


require('./passport')

const passport  = require('passport'); 


const cors= require('cors');

const app = express();


const dotenv = require('dotenv');
const path = require('path');
const errorMiddleware = require('./middlewares/errors')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//   Setting up config file
dotenv.config({ path: 'backend/config/config.env' })



app.use(session({ 
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



//setting up config file
// if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(fileUpload());


if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })

}


//import all routes
const auth = require('./routes/auth');
const product = require('./routes/product');
const category = require('./routes/category');
const ticket = require('./routes/ticket');
const stuff = require('./routes/stuff');
const information = require('./routes/information');
const conversations = require('./routes/conversations');
const messages = require('./routes/messages');
const salary = require('./routes/salary');
const commission = require('./routes/commission');
const socialAuth = require('./routes/socialAuth');


app.use('/api/v1', auth);
app.use('/api/v1', product);
app.use('/api/v1', category);
app.use('/api/v1', ticket);
app.use('/api/v1', stuff);
app.use('/api/v1', information)
app.use('/api/v1', conversations);
app.use('/api/v1', messages);
app.use('/api/v1', salary);
app.use('/api/v1', commission);
app.use('/auth', socialAuth)


//Middleware to handle errors
app.use(errorMiddleware)

module.exports = app;