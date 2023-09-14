const db_connection = require("../configration/db");
const { hashSync, compareSync } = require("bcrypt")

class User {
    constructor(userData) {
        this.userData = userData;
    }

    add(callback){
        db_connection((err,db) => {
            if (err) return err;
            let { name, email, password } = this.userData;
            password = hashSync(password, 10)
            const query = `INSERT INTO \`User\` (name, email, pass) VALUES ("${name}", "${email}", "${password}")`;
            db.query(query, (err, result) => {
                if (err){
                    return callback(err, undefined)
                }else{
                    return callback(null, result);
                }
            });
        })
            .catch(err => {
                console.log(err)
            })
    }

    static isExist(userData){
        return new Promise((resolve, reject) => {
            db_connection((err, db) => {
                if (err){
                    return reject(err);
                }
                const { email } = userData;
                const query = `SELECT * FROM \`User\` WHERE email = "${email}" LIMIT 1`;
                db.query(query, (err, result) => {
                    if (err){
                        return reject(err);
                    }
                    // console.log(result);
                    if (result.length > 0){
                        resolve({user: result[0], existence: true})
                    }else {
                        resolve({existence: false})
                    }
                })
            }).catch(err => {
                console.log(err)
            })
        })
    }

    check(callback){
        User.isExist(this.userData).then(result => {
            if (result.existence){
                const isEqual = compareSync(this.userData.password, result.user.pass)
                if (isEqual) {
                    const { id, name, email } = result.user;
                    return callback(null, { id, name, email })
                }else {
                    const err = {status: false, statusCode: 400, message: `incorrect password!`}
                    return callback(err, undefined)
                }
            }else{
                const err = {status: false, statusCode: 404, message: `user with email '${this.userData.email}' is not exist!`}
                return callback(err, undefined)
            }
        }).catch(err => {
            console.log(err)
            return callback(err, undefined);
        })
    }


}

module.exports = User;
