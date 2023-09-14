const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const { config } = require("dotenv");

config()

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.use()

io.on("connection", (socket) => {

})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server is listening on port *", PORT)
})


