const { create, get, remove, update } = require("../controllers/post.controller")
const { register, updateUser, removeUser, getUserDetails, login, getAllUsers, getUser } = require("../controllers/auth.controller")
const { createTodo, updateTodo, removeTodo, getTodosByUserId} = require("../controllers/todo.controller")

const resolvers = {
  Query: {
    // Post
    getPosts: async (_,) => { return await get() },
    // User
    login: async (_, { email, password }) => { return await login({ email, password }) },
    getUserDetails: async (_, { token }) => { return await getUserDetails({ token }) },
    getUsers: async (_,) => { return await getAllUsers() },
    getUser: async (_, { userEmail }) => { return await getUser({ userEmail }) },
  },

  Mutation: {
    // post
    createPost: async (_, { title, content, imageUrl, userId }) => {
      return await create({ title, content, imageUrl, userId })
    },
    updatePost: async (_, { postId, title, content, imageUrl, }) => {
      return await update({ postId, title, content, imageUrl, })
    },
    deletePost: async (_, { postId }) => {
      return await remove({ postId })
    },
    // todo
    createTodo: async (_, {input}) => {
      return await createTodo({input})
    },
    updateTodo: async (_, { todoId, title, message, imageUrl, status }) => {
      return await updateTodo({ todoId, title, message, imageUrl, status })
    },
    deleteTodo: async (_, { todoId }) => {
      return await removeTodo({ todoId })
    },
    // user
    createUser: async (_, { username, email, password }) => {
      return await register({ username, email, password })
    },
    updateUser: async (_, { userId, username, email, password }) => {
      return await updateUser({ userId, username, email, password })
    },
    deleteUser: async (_, { userId }) => {
      return await removeUser({ userId })
    },
  },

  User: {
    todos: async (parent, args, context, info) => {
      return await getTodosByUserId({ userId: parent.id })
    },
  },
}
module.exports = { resolvers }
