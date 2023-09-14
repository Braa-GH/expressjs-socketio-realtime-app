const authRouter = require("./auth");
const chatRouter = require("./chat");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile("index.html", { root: "./views"});
    });

    app.use("/auth", authRouter);
    app.use("/chat", chatRouter)
}