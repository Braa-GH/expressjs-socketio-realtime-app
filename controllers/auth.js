const { User } = require("../models");
const createError = require('http-errors');
const jwt = require("jsonwebtoken");
const { readFileSync } = require("fs");

const signup = (req,res,next) => {
    const userData = req.body;

    // console.log(userData)
    User.isExist(userData).then(result => {
        if (!result.existence){
            const user = new User(userData)
            user.add((err, result) => {
                if (err){
                    return next(createError(500, err.message));
                }else {
                    return res.status(201).json({status: true, userId: result.insertId});
                }
            });
        }else{
            return next(createError(400, `User with email '${userData.email}' is already exist!`))
        }
    })
}

const login = (req,res,next) => {
    const loginData = req.body;
    const user = new User(loginData);
    user.check((err, verifiedUser) => {
        if (err){
            return next(createError(500, err.message));
        }else{
            const private_key = readFileSync("./configuration/private.key");
            jwt.sign(verifiedUser, private_key,{}, (err, token) => {
                if (err){
                    return next(createError(500, "failed to generate token!"))
                }else{
                    return res.status(200).json({status: true, token})
                }
            })

        }
    })
}

module.exports = {
    signup, login
}