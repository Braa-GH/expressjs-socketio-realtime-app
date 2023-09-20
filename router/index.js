const authRouter = require("./auth");
const chatRouter = require("./chat");
const messageRouter = require("./message");
const userRouter = require("./user");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile("index.html", { root: "./views"});
    });

    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/chat", chatRouter);
    app.use("/message", messageRouter);

}