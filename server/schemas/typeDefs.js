const typeDefs = `
type Book {
    _id: ID!
    authors: String
    description: String!
    bookId: Int!
    image: String
    title: String!
  }

type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type newUser {
    username: String!
    email: String!
    password: String!
}

input newBook {
    _id: ID!
    authors: String
    description: String!
    bookId: Int!
    image: String
    title: String!
  }

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): newUser
    addBook(newBook: newBook!): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;