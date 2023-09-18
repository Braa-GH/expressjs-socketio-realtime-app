const mysql = require("mysql");
const { config } = require("dotenv");
config({ path: "../.env" });

const connection = {
    host: process.env.DB_HOST || "localhost" ,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "Chat_Application"
}

const db_connection = async (callback) => {
    const db = await mysql.createConnection(connection);
    await callback(null, db);
    await db.end();
}

module.exports = db_connection;