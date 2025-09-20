import "dotenv/config"; 
import express from "express";
import newRouter from "./app/news/router";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", newRouter)

app.listen(port, () => {
    console.log(`API is working in http://localhost:${port}`);
    
});
