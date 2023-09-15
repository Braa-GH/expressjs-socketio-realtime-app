const joi = require("joi");
const idRoles = require("./idSchema");

const msgSchema = joi.object({
    chatId: idRoles,
    senderId: idRoles,
    txt: joi.string().min(1).required()
});

module.exports = msgSchema;