const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentBody:{
        type:String,
        required:true,
    },
    commentOnBlog:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    },
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

},{ timestamps:true });

const Comment = mongoose.model('comment',commentSchema);

module.exports =  Comment;