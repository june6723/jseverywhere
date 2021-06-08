// index.js
// This is the main entry point of our application
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const depthLimit = require('graphql-depth-limit')
const { createComplexityLimitRule } = require('graphql-validation-complexity')
require('dotenv').config()

const db = require('./db')
const models = require('./models')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const jwt = require('jsonwebtoken')

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      throw new Error('Session invalid')
    }
  }
}

const port = process.env.PORT || 4000
const DB_HOST = process.env.DB_HOST

const app = express()
app.use(helmet())
app.use(cors())

const server = new ApolloServer({
  typeDefs, 
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    const token = req.headers.authorization
    const user = getUser(token)
    return { models, user }
  }
})

db.connect(DB_HOST)

server.applyMiddleware({ app, path:'/api' })

app.listen({ port }, () => 
  console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
)
