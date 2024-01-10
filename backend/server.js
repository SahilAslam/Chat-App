import express from "express";
import { chats } from "./data/data.js";
import cors from "cors";
import  dotenv  from "dotenv";
dotenv.config();
import connectDB from "./connection/db.js";
import colors from "colors";
import userRouter from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";


const port = process.env.PORT || 4000
const app = express();
connectDB();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello there Super user")
});

app.use('/api/user', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`.yellow.italic.bold));
