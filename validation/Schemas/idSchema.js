const joi = require("joi");

module.exports = joi.number().integer().min(1).integer();