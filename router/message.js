const { Router } = require("express");
const { createMsg, getAllMessages } = require("../controllers/message")

const messageRouter = new Router();
messageRouter.route("/").post(createMsg).get(getAllMessages)