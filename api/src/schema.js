const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar DateTime
  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorites: [Note!]!
  }
  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }
  type Query {
    user(username: String!): User
    users: [User!]!
    me: User!
    notes: [Note!]!
    note(id: ID!): Note!
    noteFeed(cursor: String): NoteFeed
  }
  type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    signUp(username: String!, email:String!, password: String!): String!
    signIn(username: String, email:String, password: String!): String!
    toggleFavorite(id: ID!): Note!
  }
`

module.exports = typeDefs