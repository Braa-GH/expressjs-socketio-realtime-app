const { Router } = require('express');
const { createChat, getAllChats } = require("../controllers/chat");
const { auth } = require("../middlewares")
const validation = require("../validation/chatValidation")

const chatRouter = Router();

chatRouter.route("/")
    .post(auth, validation, createChat)
    .get(auth, getAllChats);


module.exports = chatRouter;