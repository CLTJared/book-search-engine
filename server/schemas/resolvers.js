const { signToken, AuthenticationError } = require('../utils/auth');
const { Book, User } = require('../models');

const resolvers = {
    Query: { // Lesson 26 - Resolver Context | authentication/find user
        me: async (parent, args, context) => {
            if (context.user) return User.findOne({ _id: context.user._id })
            throw AuthenticationError;
        },
    },

    Mutation: { // Lesson 26 - Resolver Context
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
                if (!user) throw AuthenticationError;

            const correctPw = await user.isCorrectPassword(password);
                if (!correctPw) throw AuthenticationError;
    
            const token = signToken(user);
            return { token, user };
        },

        addBook: async (parent, { newBook }, context) => {
            if (context.user) { 
            return User.findOneAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: newBook }},
                { new: true });
            } 
            throw AuthenticationError;
        },

        removeBook: async (parent, { bookID }, context) => {
            if (context.user) {
            return await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookID }}},
                { new: true }
            );
            }
            throw AuthenticationError;
        }}

};

module.exports = resolvers;