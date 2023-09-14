
const { signupSchema, loginSchema } = require("./Schemas/authSchemas");
const createError = require("http-errors")

const validateSignupData = (req,res,next) => {
    const userData = req.body;
    const result = signupSchema.validate(userData);
    if (result.error){
        return next(createError(400, result.error.message))
    }
    next();
}

const validateLoginData = (req,res,next) => {
    const userData = req.body;
    const result = loginSchema.validate(userData);
    if (result.error){
        return next(createError(400, result.error.message))
    }
    next();
}


module.exports = {
    validateSignupData, validateLoginData
}