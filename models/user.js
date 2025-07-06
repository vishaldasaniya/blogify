const mongoose = require('mongoose');
const { type } = require('os');
const bcrypt = require('bcrypt');
const { createTokenForUser } = require('../services/authentication');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    salt:
    {
        type:String
    },
    role:
    {
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    profileImageURL:{
        type:String,
        default:"/images/userAvatar.jpg"
    }

},{ timestamps:true });

userSchema.pre('save', function(next){
    const user = this; 
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
            user.salt = salt;
            user.password = hash;
            next();
        });
    });
})

userSchema.static('matchPasswordAndGenerateToken', async function(email,password){
    const user = await this.findOne({ email });
    if(!user) throw new Error("User Not Found");
    const salt = user.salt;
    const dbPassword =user.password;
    const isMatch = await bcrypt.compare(password, dbPassword);
    if(!isMatch) throw new Error("Email or Password is Incorrect");
    const token = createTokenForUser(user);
    return token; 
    // return {...user, password:undefined, salt:undefined};
})

const User = mongoose.model('user',userSchema);

module.exports =  User ;