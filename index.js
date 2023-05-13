const { ApolloServer, gql } = require('apollo-server')
const env = require('dotenv')
const { typeDefs } = require('./graphQl/typedefs')
const { resolvers } = require('./graphQl/resolvers')
env.config()
const db = require("./models")
const connect_mysql = require("./db/connection")

// apollo server
const server = new ApolloServer({ typeDefs, resolvers });

// sync database
db.sequelize.sync().then(() => {
  console.log("Database synced")
  connect_mysql.getConnection((err, connection) => {
    if (err) console.log(err)
    console.log("Connected successfully")
  })
}).then(() => {
  server.listen({ port: 5000 }).then(({ url }) => {
    console.log(url)
  })
}).catch(err => {
  console.log(err)
})