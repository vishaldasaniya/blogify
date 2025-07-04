const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');


const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
mongoose.connect('mongodb://localhost:27017/blogify').then((e)=>{
    console.log("Mongodb Connected SuccessFully"); 
})

app.use(express.urlencoded({ extended:false }));

app.get("/",(req,res)=>{
    res.render('home');
});

app.use("/user", userRouter);

app.listen(PORT,()=>{
    console.log(`Server is started At PORT:${PORT}`);
});