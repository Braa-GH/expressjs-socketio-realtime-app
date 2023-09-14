const express = require('express');
const routes = require("./router");
const { errorHandler } = require("./middlewares");
const cors = require("cors")


const app = express();
app.use(cors())
app.use(express.json())

routes(app);

app.use(errorHandler);


module.exports = app;