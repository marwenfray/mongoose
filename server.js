const express = require('express');
const app = express();
const connectDB = require('./config/connectDB');

const port= process.env.PORT||5000;
//adding a middleware
app.use(express.json())
//connecting database
connectDB()
 //running the server
app.listen(port,err  => 
    err?console.log(err):
    console.log(`Server started on port ${port}`)
);