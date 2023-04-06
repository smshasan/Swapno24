const io = require("socket.io")(5000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && 
       users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = async (userId) => {
    return await users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
    //when connected
    console.log('a user connected')

    //take userId and socketId from user
    socket.on("addUser", async (userId) => {
        addUser(userId, socket.id)
        await io.emit("getUsers", users)
    })

    //send and get message
    socket.on("sendMessage", async ({senderId, receiverId, text}) => {
        const user = await getUser(receiverId)  
        await io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        } )
    })


    //when disconnect
    socket.on("disconnect", () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit("getUsers", users) 
    })

})
