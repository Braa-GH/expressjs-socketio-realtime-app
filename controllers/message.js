const createError = require("http-errors");
const { Message } = require("../models");

const createMsg = (req,res,next) => {
    const msgData = req.body;
    const msg = new Message(msgData);
    msg.createMsg((err, result) => {
        if (err){
            return next(createError(err.statusCode, err.message));
        }else{
            return res.status(200).json({...result})
        }
    })
}

const getAllMessages = (req,res,next) => {
    const { chatId } = req.params;

    Message.getAll(chatId).then(result => {
        return res.status(200).json(result);
    }).catch(err => {
        return next(createError(500));
    })
}

module.exports = {
    createMsg, getAllMessages
}