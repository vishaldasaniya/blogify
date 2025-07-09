require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieparser = require('cookie-parser');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const Blog = require('./models/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication')
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 8000;
console.log(process.env.PORT);

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
mongoose.connect(process.env.MONGO_URL).then((e)=>{
    console.log("Mongodb Connected SuccessFully"); 
}) 

app.use(express.urlencoded({ extended:false }));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public'))); 

app.get("/",async (req,res)=>{
    const allblogs = await Blog.find({});
    // console.log(allblogs);
    res.render('home',{
        user:req.user,
        blogs:allblogs,
    });
    
});

app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.listen(PORT,()=>{
    console.log(`Server is started At PORT:${PORT}`);
});