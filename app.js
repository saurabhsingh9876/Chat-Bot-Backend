import express from 'express';
import { config } from "dotenv";
import morgan from "morgan";
import connect from './connection/connect_db.js';
import authRouter from  "./routes/auth_route.js"
import chatRoutes from  "./routes/chats_route.js"
import  bodyParser from 'body-parser';
import cors from "cors";
import  { GoogleGenerativeAI } from "@google/generative-ai"
const app = express();


config()


// Connect to the database
connect();

//middlewere
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());





app.use(morgan("dev"));
app.use('/auth', authRouter);
app.use("/api/chat", chatRoutes);
// app.use('/chats', chatRouter);



// Start the server
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
  console.log(`Server runnig 🤟 on Port ${PORT}`);
});










// AIzaSyCdX8IuHYAP9N0m4xB2DW_Qq6Gsn_vvXlU





