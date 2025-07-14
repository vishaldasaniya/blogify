const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogtitle:{
        type:String,
        required:true
    },
    blogbody:{
        type:String,
        required:true,
    },
    blogImageURL:
    {
        type:String,
        required:false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    blogtype:{
        type:String,
        required:true
    }

},{ timestamps:true });

const Blog = mongoose.model('blog',blogSchema);

module.exports =  Blog;