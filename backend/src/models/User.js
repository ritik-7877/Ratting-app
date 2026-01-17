const db = require('../config/db');

const createUser = (userData, callBack) => {
    const { name, emal, password, address, role } = userData;
    const query = `
        INSERT INTO users (name, email, password, address, role)
        VALUES (?, ?, ?, ?, ?)
    `
    db.run(query, [name, email, password, address, role], function (error) {
        if (error) {
            return callBack(error);
        }
        callBack(null, { id: this.lastId })
    });
}

const findUserByEmail = (email, callback) => {
    const query = `
    SELECT * FROM users WHERE email = ?`

    db.get(query, [email], (error, row) => {
        if (error) {
            return callback(error)
        }
        callback(null, row)
    })
}

findUserById = (id, callback) => {
    const query = `
    SELECT id, name, email, address , role FROM users WHERE id = ?`
    db.get(query, [id], (error, row) => {
        if (error) {
            return callback(error)
        }

        callback(null, row)
    })
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
}