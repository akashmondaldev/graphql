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
        content: String
        logo: String
        userId: User
        createdAt: String!
        updatedAt: String!
    }
    
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        posts: [Todo]
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

    type Mutation {
        # Post
        createPost(title: String!, content: String!, imageUrl: String!,userId:String!): String!
        updatePost(postId: ID!, title: String!, content: String!, imageUrl: String!): String!
        deletePost(postId: ID!): String!
        # User
        createUser(username: String!, email: String!, password: String!):String!
        updateUser(userId: ID!, username: String!, email: String!, password: String!): String!
        deleteUser(userId: ID!): String!
    }
`;

module.exports = { typeDefs }

