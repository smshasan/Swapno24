const app = require('./app');
const connectDatabase = require('./config/database');

// const dotenv = require('dotenv');
const cloudinary = require('cloudinary');


// socket
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);


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
    



// //socket
// // const io = require("socket.io")

// let users = [];

// const addUser = (userId, socketId) => {
//     !users.some((user) => user.userId === userId) && 
//         users.push({ userId, socketId })
// }

// const removeUser = (socketId) => {
//     users = users.filter((user) => user.socketId !== socketId)
// }

// const getUser = (userId) => {
//     return users.find((user) => user.userId === userId)
// }

// io.on("connection", (socket) => {
//     //when connected
//     console.log('a user connected')

//     //take userId and socketId from user
//     socket.on("addUser", (userId) => {
//         addUser(userId, socket.id)
//         io.emit("getUsers", users)
//     })

//     //send and get message
//     socket.on("sendMessage", ({senderId, receiverId, text}) => {
//         const user = getUser(receiverId)  
//         io.to(user.socketId).emit("getMessage", {
//             senderId,
//             text
//         } )
//     })



//     //when disconnect
//     socket.on("disconnect", () => {
//         console.log('a user disconnected')
//         removeUser(socket.id)
//         io.emit("getUsers", users) 
//     })

// })



const PORT = 4990
app.get('/', (req, res) => {
        res.send('Alhamdulillah Working')
});



// const server = app.listen(PORT, () => {
//         console.log(`Server started at http://localhost:${PORT}`)
// })

const server = app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`)
})

//Handle unhandled promise rejections

// process.on('unhandledRejection', err => {
//         console.log(`ERROR: ${err.stack}`);
//         console.log('Shutting down the server due to Unhandled Promise Rejection')
//         server.close(() => {
//             process.exit(1)
//         })
//     })

process.on('unhandledRejection', err => {
        console.log(`ERROR: ${err.stack}`);
        console.log('Shutting down the server due to Unhandled Promise Rejection')
        server.close(() => {
            process.exit(1)
        })
    })