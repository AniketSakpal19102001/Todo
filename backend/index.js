import express from "express";
import  mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js"
import todo from "./routes/todo.js"
import verifyToken from "./middleware/verifyToken.js";
import cors from "cors"
import config from "./config/config.js";
const app = express();
const corsOptions = {
    origin: config.corsOrigin,
    credentials: true, 
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/", auth)
app.use("/todo", verifyToken, todo)

mongoose.connect(config.dbUrl).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(3000, ()=>{
    console.log("server running at 3000");
    
})