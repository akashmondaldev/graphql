const mysql = require('mysql2')
require('dotenv').config()
const host = process.env.HOST
const user = process.env.USER
const password = process.env.PASSWORD
const database = process.env.DATABASE
const port = process.env.MYSQLPORT 

const connect_mysql = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    port: port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise()


module.exports = connect_mysql