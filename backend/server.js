import express from "express";
import { chats } from "./data/data.js";
import cors from "cors";
import  dotenv  from "dotenv";
dotenv.config();
import connectDB from "./connection/db.js";
import colors from "colors";


const port = process.env.PORT || 4000
const app = express();
connectDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello there Super user")
});

app.get('/api/chat', (req, res) => {
    res.json(chats)
});

app.get('/api/chat/:id', (req, res) => {
    const selectedChat = chats.find((chat) => chat._id === req.params.id);
    res.json(selectedChat);
})

app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`.yellow.italic.bold));
