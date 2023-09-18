const db_connection = require("../configuration/db");

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

            const query = `insert into Message(chatId, senderId, txt) values (${chatId},${senderId}, "${txt}")`;
            db.query(query, (err, result) => {
                if (err) return callback({status: false, statusCode: 500, message: "failed to save message"}, undefined);

                return callback(null, {status: true, messageId: result.insertId});
            })
        }).catch(err => {
            return callback({status: false, statusCode: 500, message: "Db connection error"}, undefined);
        })
    }

    static getAll(chatId){
        return new Promise((resolve, reject) => {
            db_connection((err, db) => {
                if (err) return reject(err);

                const query = `select * from Message where chatId = ${chatId}`;
                db.query(query, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                })

            }).catch(err => {
                return reject(err);
            })
        });
    }

}