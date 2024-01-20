import express from "express";
import cors from "cors";
import  dotenv  from "dotenv";
dotenv.config();
import connectDB from "./connection/db.js";
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const port = process.env.PORT || 4000
const app = express();
connectDB();

app.use(express.json());

app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`.yellow.italic.bold));
