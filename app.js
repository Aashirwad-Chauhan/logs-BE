import express from "express";
import logger from "./routes/logs.js"
import { connectDB } from "./db/database.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import {config} from "dotenv";


const app = express();
connectDB();

config({
    path: "./config.env",
});

app.use(express.json()); 
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://logs-25ktygvk9-aashirwad-chauhans-projects.vercel.app",
        "https://logs-fe.vercel.app",
        "https://logs-fe-aashirwad-chauhans-projects.vercel.app",
        "http://localhost:5174",
        "http://localhost:4173",
        process.env.FRONT_END_URL,
    ],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}));


app.use("/api/v1/logger", logger)

app.get("/", (req, res)=>{
    res.send("Konichiva!!");
});

let Port = process.env.PORT || 3000;

app.listen(Port, ()=>{
    console.log("At the Server!!");
    console.log(`PORT: ${process.env.PORT} | MODE: ${process.env.NODE_ENV}` );
});

app.use(errorMiddleware);
