const { Router } = require('express');
const { createChat, getAllChats } = require("../controllers/chat");
const { auth } = require("../middlewares")

const chatRouter = Router();

chatRouter.route("/")
    .post(auth, createChat)
    .get(auth, getAllChats);


module.exports = chatRouter;