const { Router } = require("express");
const { auth } = require("../middlewares");
const { getUser } = require("../controllers/user")

const userRouter = new Router();
userRouter.get("/:userId", auth, getUser);

module.exports = userRouter;