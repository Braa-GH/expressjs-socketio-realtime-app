const joi = require('joi');

const createChatSchema = joi.object({
    firstId: joi.number().integer().min(1).required(),
    secondId: joi.number().integer().min(1).required(),
})

module.exports = createChatSchema;