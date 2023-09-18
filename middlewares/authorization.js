const createError = require("http-errors");
const dbConnection = require("../configuration/db");

const isChatMember_create = (req,res,next) => {

    const { userId } = req;

    const { chatId, senderId } = req.body ;

    if (senderId !== userId){
        return next(createError(403, "you cannot send this message"))
    }

    dbConnection((err, db) => {
        if (err) return next(createError(500, "db connection error"));

        db.query(`select firstId, secondId from Chat where id = ${chatId} limit 1`, (err, result) => {
            if (err) return next(createError(500, err.message));

            if (result.length > 0){
                const { firstId, secondId } = result[0];
                if (userId === firstId || userId === secondId){
                    return next();
                }else{
                    return next(createError(403, "user is not a member of this chat!"));
                }
            }else{
                return next(createError(404, "chat is not exist!"))
            }

        })

    }).catch(e => {
        if (e) return next(createError(500));
    })
}

const isChatMember_get = (req,res,next) => {

    const { userId } = req

    const { chatId } = req.params ;

    dbConnection((err, db) => {
        if (err) return next(createError(500, "db connection error"));

        db.query(`select firstId, secondId from Chat where id = ${chatId} limit 1`, (err, result) => {
            if (err) return next(createError(500, err.message));

            if (result.length > 0){
                const { firstId, secondId } = result[0];
                if (userId === firstId || userId === secondId){
                    return next();
                }else{
                    return next(createError(403, "user is not a member of this chat!"));
                }
            }else{
                return next(createError(404, "chat is not exist!"))
            }

        })

    }).catch(e => {
        if (e) return next(createError(500));
    })
}

module.exports = {
    isChatMember_create, isChatMember_get
}