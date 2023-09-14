const { verify } = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = (req,res,next) => {
    try{
        const authHeader = req.get("Authorization");
        if (!authHeader){
            return next(createError(401, "token required!"))
        }
        const token = authHeader.split(' ')[1];
        const private_key = process.env.TOKEN_PRIVATE_KEY;
        verify(token, private_key, {}, (err, decode) => {
            if (err) return next(createError(401, "Invalid Token"));

            req.userId = decode.id;
            return next();
        })
    }catch (e) {
        return next(createError(500, e.message));
    }

}