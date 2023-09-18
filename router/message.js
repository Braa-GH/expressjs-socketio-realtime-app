const { Router } = require("express");
const { createMsg, getAllMessages } = require("../controllers/message");
const msgValidation = require("../validation/msgValidation");
const { auth } = require("../middlewares");
const { isChatMember_create, isChatMember_get } = require("../middlewares/authorization");

const messageRouter = new Router({mergeParams: true});
messageRouter.route("/").post(auth, msgValidation, isChatMember_create, createMsg).get(auth, isChatMember_get, getAllMessages)

module.exports = messageRouter;