const mongoose = require("mongoose")
const { ApolloServer, gql } = require('apollo-server')
const env = require('dotenv')
const { typeDefs } = require('./graphQl/typedefs')
const { resolvers } = require('./graphQl/resolvers')
env.config()

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("mongoDB connect")
        return server.listen({ port: 5000 })
    })
    .then(({ url }) => {
        console.log(url)
    })