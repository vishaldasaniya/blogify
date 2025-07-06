const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

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

router.get("/:id",async (req,res)=>{
  const blogid = req.params.id;
  const bloginfo =await Blog.findById(blogid).populate("createdBy");
  const commentInfo =await Comment.find({commentOnBlog:req.params.id}).populate("commentedBy");
  // console.log(bloginfo);
  return res.render("blogDetails",
    {
      user:req.user,
      bloginfo,
      commentInfo
    }
  );
})


router.post("/comment/:id", async (req,res)=>{
  const commentBody = req.body.commentBody;
  const commentOnBlog = req.params.id;
  const commentedBy = req.user._id;
  const commentInfo = await Comment.create({
    commentBody,
    commentOnBlog,
    commentedBy
  });
  console.log(commentInfo);
  return res.redirect(`/blog/${req.params.id}`);
})



module.exports = router;