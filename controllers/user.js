const createError = require("http-errors");
const { User } = require("../models");

const getUser = (req,res,next) => {
    const { userId } = req.params;
    User.getById(userId).then(result => {
        if (result.status){
            const { name, email, registerd_at } = result.user;
            return res.status(200).json({ name, email, registerd_at })
        }else{
            return next(createError(404));
        }
    }).catch(err => next(createError(500)));
}

module.exports = {
    getUser
}