
const chatSchema = require("./Schemas/chatSchema");
const createError = require("http-errors");
module.exports = (req,res,next) => {
    const chatData = req.body;
    const { error } = chatSchema.validate(chatData);
    if (error){
        return next(createError(400, error.message));
    }
    next();
}