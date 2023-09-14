
const { Router } = require('express');
const { signup, login } = require('../controllers/auth');
const { validateSignupData, validateLoginData } = require("../validation/authValidator")

const authRouter = Router();

authRouter.post("/signup", validateSignupData, signup)
    .post("/login", validateLoginData, login);

module.exports = authRouter;