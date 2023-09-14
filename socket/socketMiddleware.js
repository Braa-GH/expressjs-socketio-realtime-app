const createError = require("http-errors");
const { verify } = require("jsonwebtoken")

module.exports = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token){
        return next(createError(403, "Token Required"));
    }else{
        const private_key = process.env.TOKEN_PRIVATE_KEY;
        verify(token, private_key,{}, (err) => {
            if (err){
                socket.emit()
                return next(createError(403, "Unverified token"));
            }else{
                return next();
            }
        })
    }
}