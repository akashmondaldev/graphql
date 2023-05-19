const UserModel = require("../model/User")
const PostModel = require("../model/Post")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Conversation = require('../model/Conversation')

const resolvers = {

  Query: {

    // get all users
    Users: async () => {
      return await UserModel.find({})
    },

    // find id
    userFindById: async (_, { id }) => {
      return await UserModel.findById(id)
    },
    GetUser: async (_, { token }) => {
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      return await UserModel.findById(verify.user.id)
    },

    // login
    LoginUser: async (_, { input }) => {
      const findUser = await UserModel.findOne({ email: input.email })
      if (findUser) {
        const validPassword = await bcrypt.compare(input.password, findUser.password)
        if (validPassword) {
          const data = {
            user: { id: findUser._id, }
          }
          const token = jwt.sign(data, process.env.JWT_SECRET)
          return { status: "Login Successfully", token: token }
        } else {
          return { status: "Not Correct User Credentials", token: false }
        }
      } else {
        return { status: "User Not Found", token: false }
      }
    },

  //   get conversation
    findUserConversation:(_,{authorId})=>{
      console.log(authorId)

    }


  },


  Mutation: {
    // Create User 
    CreateUser: async (_, { input }) => {
      const alreadyRegister = await UserModel.findOne({ email: input.email })
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(input.password, salt)

      const newUser = {
        username: input.username,
        email: input.email,
        password: hashedPassword,
        status: "true"
      }

      if (alreadyRegister) {
        return { status: "User Already Exists", token: false }
      } else {
        await UserModel.create(newUser)
        const data = {
          user: { id: UserModel._id, }
        }
        const token = jwt.sign(data, process.env.JWT_SECRET)
        return { status: "Register Successfully", token: token }
      }
    },

    // Update User
    UpdateUser: async (_, { input, id }) => {
      // console.log(input, id)
      if (input.password) {
        const salt = await bcrypt.genSalt(10)
        input.password = await bcrypt.hash(input.password, salt)
      }
      await UserModel.findByIdAndUpdate(id, { $set: input })
      return { status: "User Update Successfully" }
    },

    // Delete User
    DeleteUser: async (_, { id }) => {
      await UserModel.findByIdAndDelete(id)
      return { status: "User Delete Successfully" }
    },

    // Post Create
    CreatePost: async (_, { input }) => {
      // console.log(input)
      const newPost = {
        userId: input.userId,
        desc: input.desc,
        img: input.img
      }
      return await PostModel.create(newPost)
    },

    // follow user
    FollowUser: async (_, { AuthorId, userId }) => {
      const Author = await UserModel.findById(AuthorId)
      const User = await UserModel.findById(userId)

      if (Author.followings.includes(userId)) {
        await Author.updateOne({ $pull: { followings: userId } })
        await User.updateOne({ $pull: { followers: AuthorId } })
        return { status: "Unfollow User Successfully" }
      } else {
        await Author.updateOne({ $push: { followings: userId } })
        await User.updateOne({ $push: { followers: AuthorId } })
        return { status: "Follow User Successfully" }
      }
    },

  //   conversation

    CreateConversation: async (_,{authorId,userId})=>{
     try {
       const user = await UserModel.findById(userId)
       const author = await UserModel.findById(authorId)
       const AlreadyFriend = await Conversation.findOne({members:[authorId,userId]})

       if (!AlreadyFriend){
         const conversation = await Conversation.create({
           members: [authorId,userId],
           lastTime: "",
           lastMessage: "New Friend",
         })
         await user.updateOne({ $push: { chatList: conversation.id } })
         await author.updateOne({ $push: { chatList: conversation.id } })

       }else {
         await user.updateOne({ $pull: { chatList: AlreadyFriend.id } })
         await author.updateOne({ $pull: { chatList: AlreadyFriend.id } })
         await Conversation.findOneAndDelete(AlreadyFriend.id)
       }
     } catch (error){
       console.log(error)
     }
    },

  //   Update Conversation
    UpdateConversation:async (_,{id,input}) =>{

      await Conversation.findByIdAndUpdate(id,input)
    }

  },

  // User Post 
  User: {
    posts: async (_) => {
      return await PostModel.find({ userId: _.id })
    },

    followers: async (_) => {
      let followersUser = []
      for (let index = 0; index < _.followers.length; index++) {
        let userF = await UserModel.findById(_.followers[index])
        followersUser.push(userF)
      }
      return followersUser
    },

    followings: async (_) => {
      let followingUser = []
      for (let index = 0; index < _.followings.length; index++) {
        let userF = await UserModel.findById(_.followings[index])
        followingUser.push(userF)
      }
      return followingUser
    }
  },


};

module.exports = { resolvers }
