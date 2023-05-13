const uniqid = require('uniqid');
const connect_mysql = require('../db/connection')
const updatedAt = new Date()

// get all posts function
const get = async () => {
    const [rows] = await connect_mysql.query('SELECT * FROM Posts')
    return rows
}

// create post function
const create = async ({ title, content, imageUrl, userId }) => {
    const id = uniqid()
    const sql = `INSERT INTO Posts (id,title,content,imageUrl,userId,createdAt,updatedAt) VALUES ('${id}','${title}','${content}','${imageUrl}','${userId}','${updatedAt}','${updatedAt}')`
    await connect_mysql.query(sql)
    return "success create"
}

// update post function
const update = async ({ postId, title, content, imageUrl }) => {
    const sql = `UPDATE Posts SET title='${title}',content='${content}',imageUrl='${imageUrl}',updatedAt='${updatedAt}' WHERE id='${postId}'`
    await connect_mysql.query(sql)
    return "success update"
}

// delete post function
const remove = async ({ postId }) => {
    const sql = `DELETE FROM Posts WHERE id='${postId}'`
    await connect_mysql.query(sql)
    return "success delete"
}

// export all functions
module.exports = {
    get,
    create,
    update,
    remove
}