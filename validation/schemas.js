const joi = require("joi");

const signupSchema = joi.object({
    name: joi.string().min(1).max(60).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
            .message("password should be:\n" +
                "At least one uppercase or lowercase letter.\n" +
                "At least one digit.\n" +
                "At least one special character from the set [@$!%*?&].\n" +
                "Minimum length of 8 characters.")
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .message("password should be:\n" +
            "At least one uppercase or lowercase letter.\n" +
            "At least one digit.\n" +
            "At least one special character from the set [@$!%*?&].\n" +
            "Minimum length of 8 characters.")
})

module.exports = {
    signupSchema, loginSchema
}