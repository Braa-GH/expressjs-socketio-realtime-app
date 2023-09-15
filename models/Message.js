const db_connection = require("../configration/db");

module.exports = class Message {
    constructor(messageData) {
        this.messageData = messageData;
    }

    createMsg (callback){
        db_connection((err, db) => {
            if (err){
                return callback({status: false, statusCode: 500, message: "Db connection error"}, undefined);
            }
            const { chatId, senderId, txt } = this.messageData;

            //check is user is a member of the chat
            db.query(`select firstId, secondId from Chat where id = ${chatId} limit 1`, (err, result) => {
                if (err) return callback({status: false, statusCode: 500, message: "failed to save message"}, undefined);

                if (result.length > 0){
                    const { firstId, secondId } = result[0];
                    if (senderId != firstId && senderId != secondId){
                        return callback({status: false, statusCode: 403, message: "sender is not a member in this chat"}, undefined);
                    }
                }
            })

            const query = `insert into Message(chatId, senderId, txt) values (${chatId},${senderId}, "${txt}")`;
            db.query(query, (err, result) => {
                if (err) return callback({status: false, statusCode: 500, message: "failed to save message"}, undefined);

                return callback(null, {status: true, messageId: result.insertId});
            })
        }).catch(err => {
            return callback({status: false, statusCode: 500, message: "Db connection error"}, undefined);
        })
    }

}