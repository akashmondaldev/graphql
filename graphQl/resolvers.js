const { create, get, remove, update } = require("../controllers/post.controller")
const { register, updateUser, removeUser, getUserDetails, login, getAllUsers, getUser } = require("../controllers/auth.controller")
const resolvers = {
  Query: {
    // Post
    getPosts: async (_,) => { return await get() },
    getPost: async (_, { postId }) => { },
    // User
    login: async (_, { email, password }) => { return await login({ email, password }) },
    getUserDetails: async (_, { token }) => { return await getUserDetails({ token }) },
    getUsers: async (_,) => { return await getAllUsers() },
    getUser: async (_, { userEmail }) => { return await getUser({ userEmail })},
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
}
module.exports = { resolvers }
