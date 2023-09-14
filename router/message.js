const { Router } = require("express");
const { createMsg, getAllMess } = require("../controllers/message")

const messageRouter = new Router();
messageRouter.route("/").post(createMsg).get(getAllMess)