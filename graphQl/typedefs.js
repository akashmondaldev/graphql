const { gql } = require('apollo-server-express');

const typeDefs = gql`

# post schema
  type Post {
    id:ID!
    userId:String!
    desc:String!
    img:[String]
    likes:[String]
    comments:[String]
  }

# conversation schema
type Conversation {
    id:ID!
    members:[User]
    lastTime:String
    lastMessage:String
}

#  user schema
  type User {
    id:ID!
    username:String
    email:String!
    password:String!
    status:String
    token:String
    avatar:String
    coverPicture:String
    followers:[User]
    followings:[User]
    chatList:[String]
    posts:[Post]
    bio:String
    updatedAt:String
    createdAt:String
  }

#post
input CreatePostCredential {
    userId:String!
    desc:String
    img:[String]
    likes:[String]
    comments:[String]
}

input UpdatePostCredential {
    desc:String
    img:String
    likes:[String]
    comments:[String]
}

#user
  input CreateUserCredential {
    username:String!
    password:String!
    email:String!
    avatar:String
  }

  input LoginUserCredential {
    email:String!
    password:String!
  }

  input UpdateUserCredential {
    username:String
    password:String
    avatar:String
    coverPicture:String
    followers:[String]
    followings:[String]
    chatList:[String]
    bio:String
  }

input UpdateConversation {
    lastTime:String
    lastMessage:String
}

  type Query {
 # user get
    Users:[User!]!
    userFindById(id:ID!):User!
    LoginUser(input:LoginUserCredential!):User!
    GetUser(token:String!):User!
 # Post get
    Posts:[Post!]!
    postFindById(id:ID!):Post!
      
#  GetUserConversation
      findUserConversation(authorId:ID!):Conversation

  }

  type Mutation {
#   User
    CreateUser(input: CreateUserCredential!):User! # create user
    UpdateUser(input: UpdateUserCredential!,id:ID!):User! # update user
    DeleteUser(id: ID!):User! # delete user 
    FollowUser(AuthorId:ID!,userId:String!):User! # follow user

#   Post
    CreatePost(input: CreatePostCredential!):Post! # create post
    UpdatePost(input: UpdatePostCredential!,id:ID!):Post! # update post
    DeletePost(id: ID!):Post! # delete post

#   Conversation
      CreateConversation(authorId:String!,userId:String!):String
      UpdateConversation(id:ID!,input:UpdateConversation!):String
  }

`;

module.exports = { typeDefs }

