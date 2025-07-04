const jwt = require('jsonwebtoken');
const secret = "VishalChoudhary@...?@";

function createTokenForUser(user)
{
    const payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        role:user.role,
        profileImageURL:user.profileImageURL
    };
    const token = jwt.sign(payload,secret);
    return token;
};

function validateToken(token)
{
    var decode = jwt.verify(token,secret);
    return decode;
}

module.exports = {
    createTokenForUser,
    validateToken
};