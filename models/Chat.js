const db_connection = require("../configuration/db");
const {query} = require("express");

module.exports = class Chat {
    constructor(firstId, secondId) {
        this.firstId = firstId;
        this.secondId = secondId;
    }

    isExist(){
        return new Promise((resolve, reject) => {
            db_connection((err, db) => {
                if (err) return reject(err);

                const query = `select * from Chat where firstId = ${this.firstId} and secondId = ${this.secondId} LIMIT 1`;
                db.query(query, (err, result) => {
                    if (err) return reject(err);

                    if (result.length > 0){
                        return resolve({status: true, existence: true, chat: result[0]})
                    }
                    return resolve({existence: false})

                })
            })
                .catch(err => {
                    return reject(err);
                })
        })
    }

    create(callback){
        db_connection(async (err, db) => {
            if (err){
                const error = {status: false, statusCode: 500, message: "DB Server Error"}
                return callback(error, undefined)
            }else{
                const query = `INSERT INTO Chat(firstId, secondId) VALUES("${this.firstId}", "${this.secondId}")`;
                await db.query(query, (err, result) => {
                    if (err){
                        const error = {status: false, statusCode: 500, message: "Failed to create chat!"}
                        return callback(error, undefined)
                    }else{
                        return callback(null, result)
                    }
                });
            }
        }).catch(err => {
            const error = {status: false, statusCode: 500, message: "DB Server Error"}
            return callback(error, undefined)
        })
    }

    static getAll(userId){
        return new Promise((resolve, reject) => {
            db_connection((err, db) => {
                if (err) return reject(err);

                const query = `select * from Chat where firstId = ${userId} OR secondId = ${userId}`;
                db.query(query, (err, result) => {
                    if (err) return reject(err);

                    return resolve({status: true, count: result.length, chats: result});
                })
            })
            .catch(err => {
                return reject(err);
            })
        })
    }

    // static get(chatId){
    //     return new Promise((resolve, reject) => {
    //         db_connection((err, db) => {
    //             if (err) return reject(err);
    //
    //             const query = `select * from Chat where id = ${chatId}`;
    //             db.query(query, (err, result) => {
    //                 if (err) return reject(err);
    //                 if (result.length > 0){
    //
    //                 }
    //             })
    //         })
    //         .catch(err => {
    //             return reject(err);
    //         })
    //     })
    // }
}
