const uniqid = require('uniqid');
const connect_mysql = require('../db/connection')
const updatedAt = new Date()

// get User all Todos function
const getUserTodos = async () => {
    const [rows] = await connect_mysql.query('SELECT * FROM Todos')
    return rows
}

// create todo function
const createTodo = async ({ input }) => {
    const { title, message, imageUrl, userId, status, id, updatedAt, createdAt } = input
    const sql = `INSERT INTO Todos (id,title,message,imageUrl,userId,status,createdAt,updatedAt) VALUES ('${id}','${title}','${message}','${imageUrl}','${userId}','${status}','${createdAt}','${updatedAt}')`
    await connect_mysql.query(sql)
    return "success create"
}

// update todo function
const updateTodo = async ({ title, message, imageUrl, status, todoId }) => {
    
    const sql = `UPDATE Todos SET title='${title}',message='${message}',imageUrl='${imageUrl}',imageUrl='${status}',updatedAt='${updatedAt}' WHERE id='${todoId}'`
    await connect_mysql.query(sql)
    return "success update"
}

// delete todo function
const removeTodo = async ({ todoId }) => {
    const sql = `DELETE FROM Todos WHERE id='${todoId}'`
    await connect_mysql.query(sql)
    return "success delete"
}

// get User all Todos function
const getTodosByUserId = async ({ userId }) => {
    const sql = `SELECT * FROM Todos WHERE userId='${userId}'`
    const [rows] = await connect_mysql.query(sql)
    return rows
}


// export all functions
module.exports = {
    getUserTodos,
    createTodo,
    updateTodo,
    removeTodo,
    getTodosByUserId
}