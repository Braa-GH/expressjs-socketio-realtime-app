const msgSchema = require("./Schemas/msgSchema");
const createError = require("http-errors");

module.exports = (req,res,next) => {
    const msgData = req.body;
    const { error } = msgSchema.validate(msgData);
    if (error){
        return next(createError(400, error.message));
    }
    next();
}