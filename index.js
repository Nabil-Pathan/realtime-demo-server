import express from "express"
import { Server } from "socket.io"
import http from "http"
import cors from "cors"

const app = express()



app.use(cors())

app.get("/", (req , res)=>{
    res.send("Server is Running")
})

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin : "*"
    }
})

io.on("connection", (socket)=>{
    // console.log(`Connected ${socket.id}`);
    socket.on('send-message', (message)=>{
       io.emit("message-received", message)  
    })
})

server.listen(5000,()=>{
    console.log("Server Started");
})

