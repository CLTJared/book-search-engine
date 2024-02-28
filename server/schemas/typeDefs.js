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

type newUser {
    username: String!
    email: String!
    password: String!
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): newUser
    saveBook(newBook: InputBook!): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;