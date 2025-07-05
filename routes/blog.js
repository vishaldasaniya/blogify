const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const Blog = require('../models/blog');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  }
})

const upload = multer({ storage: storage })

router.get("/add-new", (req,res)=>{
    return res.render("addBlogPage",{
        user:req.user
    });
});

router.post("/addblogdb",upload.single('blogimage'), async (req,res)=>{
    const { blogtitle, blogbody } = req.body;
    const blog = await Blog.create({
        blogtitle,
        blogbody,
        blogImageURL:`/uploads/${req.file.filename}`,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${blog._id}`);
});



module.exports = router;