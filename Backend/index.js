import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import authRouter from './routes/auth.routs.js';
import userRouter from './routes/userroutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import websiteRouter from './routes/website.routes.js';


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://abhira-io.netlify.app/",
    credentials: true,
}));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/Website", websiteRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB(cors());
})