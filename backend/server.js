const app = require('./app');
const connectDatabase = require('./config/database');

// const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

//Handle Uncaught execptions 
process.on('uncaughtException', err => {
        console.log(`ERROR: ${err.stack}`);
        console.log('Shutting down server due to uncaught execpions');
        process.exit(1);
    } )
    

//setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//dotenv.config({ path: 'backend/config/config.env' });



// connect database;
connectDatabase();


//Setting up cloudinary config
cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    




const PORT = 4990
app.get('/', (req, res) => {
        res.send('Alhamdulillah Working')
});



const server = app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
})

//Handle unhandled promise rejections

process.on('unhandledRejection', err => {
        console.log(`ERROR: ${err.stack}`);
        console.log('Shutting down the server due to Unhandled Promise Rejection')
        server.close(() => {
            process.exit(1)
        })
    })