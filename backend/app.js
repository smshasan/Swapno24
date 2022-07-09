const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())


const dotenv = require('dotenv');
const path = require('path');
const errorMiddleware = require('./middlewares/errors')

const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');
 const fileUpload = require('express-fileupload');

//   Setting up config file
dotenv.config({ path: 'backend/config/config.env' })




//setting up config file
// if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/api/v1', auth);
app.use('/api/v1', product);
app.use('/api/v1', category);


//Middleware to handle errors
app.use(errorMiddleware)

module.exports = app;