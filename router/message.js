const { Router } = require("express");
const { createMsg, getAllMessages } = require("../controllers/message");
const msgValidation = require("../validation/msgValidation");
const { auth } = require("../middlewares")

const messageRouter = new Router();
messageRouter.route("/").post(auth, msgValidation, createMsg).get(auth, getAllMessages)

module.exports = messageRouter;