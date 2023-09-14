const createError = require("http-errors");
const { Chat } = require("../models")

const createChat = (req,res,next) => {
    const userId = req.userId;
    const { firstId, secondId } = req.body;
    if (userId == firstId || userId == secondId){
        const chat = new Chat(firstId, secondId);
        chat.isExist().then(result => {
            if (result.existence){
                return res.status(200).json({status: true, chatId: result.chat.id})
            }else{
                chat.create((err, result) => {
                    if (err){
                        return next(createError(err.statusCode, err.message));
                    }else{
                        return res.status(201).json({status: true, chatId: result.insertId});
                    }
                })
            }
        }).catch(err => {
            return next(createError(500, err.message));
        })
    }else{
        return next(createError(403, "You can not create this chat!"))
    }


}

const getAllChats = (req,res,next) => {
    const userId = req.userId;
    Chat.getAll(userId).then(result => {
        if (result.status){
            return res.status(200).json(result);
        }
    }).catch(err => {
        return next(createError(500, err.message));
    })
}

module.exports = {
    createChat, getAllChats
}