const authRouter = require('./auth');

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.sendFile("index.html", { root: './views'});
    });

    app.use('/auth', authRouter);
}