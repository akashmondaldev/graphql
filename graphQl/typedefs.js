const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Post {
        id: ID!
        title: String!
        content: String
        imageUrl: String
        userId: User
        createdAt: String!
        updatedAt: String!
    }

    type Todo {
        id: ID!
        title: String!
        message: String
        userId: String!
        status: Int!
        createdAt: String!
        updatedAt: String!
    }
    
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        todos: [Todo!]
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        # Post
        getPosts: [Post]!
        getPost(postId: ID!): Post!
        # User
        getUsers: [User]!
        getUser(userEmail: String!): User!
        login(email: String!, password: String!): String!
        getUserDetails(token: String!): User!
    }

    input CreateTodoInput {
        title: String!
        message: String!
        imageUrl: String!
        userId: String!
        status: Int!
        id: ID!
        createdAt: String!
        updatedAt: String!
    }


    type Mutation {
        # Post
        createPost(title: String!, content: String!, imageUrl: String!,userId:String!): String!
        updatePost(postId: ID!, title: String!, content: String!, imageUrl: String!): String!
        deletePost(postId: ID!): String!
        # User
        createUser(username: String!, email: String!, password: String!):String!
        updateUser(userId: ID!, username: String!, email: String!, password: String!): String!
        deleteUser(userId: ID!): String!
        # Todo
        createTodo(input:CreateTodoInput!): String!
        updateTodo(todoId: ID!, title: String!, message: String!, imageUrl: String!, status:Int!): String!
        deleteTodo(todoId: ID!): String!
    }`;

module.exports = { typeDefs }

