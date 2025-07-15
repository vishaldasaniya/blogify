const express = require('express');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/profileimage'));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + file.originalname;
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

router.get("/signin",(req,res)=>{
    return res.render('signin');
})

router.get("/signup", (req,res) =>{
    return res.render('signup');
})

router.post("/signup", async (req,res) =>{
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect('/');
})
router.post("/signin", async (req,res) =>{
    const { email, password } = req.body;
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    }
    catch(error)
    {
        return res.render("signin",{ 
            error:"Incorrect Email or Password"
        }); 
    }
})

router.get("/logout", (req, res)=>{
    return res.clearCookie("token").redirect("/");
})

router.post('/profileimage', upload.single('profileimage'), async(req,res)=>{
    // console.log(req.file);
    const user = await User.findById(req.user._id);
    user.profileImageURL = `/profileimage/${req.file.filename}`;
    await user.save();
    return res.redirect('/');
})

module.exports = router;