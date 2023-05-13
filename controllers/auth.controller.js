const uniqid = require('uniqid');
const connect_mysql = require('../db/connection')
const updatedAt = new Date()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
const secret = process.env.SECRET_KEY

// get all users function
const getAllUsers = async () => {
    const [rows] = await connect_mysql.query('SELECT * FROM Users')
    return rows
}

// get user function
const getUser = async ({ userEmail }) => {
    const [row] = await connect_mysql.query(`SELECT * FROM Users WHERE email = '${userEmail}'`)
    return row[0]
}

// get user details function
const getUserDetails = async ({ token }) => {
    const decoded = jwt.verify(token, secret)
    const [row] = await connect_mysql.query(`SELECT * FROM Users WHERE id = '${decoded.id}'`)
    return row[0]
}

// login function
const login = async ({ email, password }) => {
    const [row] = await connect_mysql.query(`SELECT * FROM Users WHERE email = '${email}'`)
    if (row.length === 0) {
        return "User does not exist"
    } else {
        const match = await bcrypt.compare(password, row[0].password);
        if (match) {
            const token = jwt.sign({ id: row[0].id }, secret)
            return token
        } else {
            throw new Error('Incorrect password')
        }
    }
}

// register function
const register = async ({ username, email, password }) => {

    // check if user already exists in the database 
    const [row] = await connect_mysql.query(`SELECT * FROM Users WHERE email = '${email}'`)

    // if user already exists, return error
    if (row.length > 0) {
        return "User already exists"
    } else {
        try {
            const hash_password = await bcrypt.hash(password, saltRounds)
            const id = uniqid()
            connect_mysql.query(
                `INSERT INTO Users (id, username, email, password, createdAt, updatedAt) VALUES ('${id}', '${username}', '${email}', '${hash_password}', '${updatedAt}', '${updatedAt}')`,)
            const token = jwt.sign({ id }, secret)
            return token
        } catch (error) {
            return error
        }
    }
}

// update user function
const updateUser = async ({ userId, username, email, password }) => {
    connect_mysql.query(`
    UPDATE Users SET username = '${username}', email = '${email}', password = '${password}', updatedAt = '${updatedAt}' WHERE id = '${userId}'`,)
    return "User updated successfully"
}

// remove user function
const removeUser = async ({ userId }) => {
    connect_mysql.query(`DELETE FROM Users WHERE id = '${userId}'`,)
    return "User deleted successfully"
}

// export functions
module.exports = {
    login,
    register,
    updateUser,
    removeUser,
    getUserDetails,
    getAllUsers,
    getUser
}