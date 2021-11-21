const { ApolloServer } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Question = require('./resolvers/Question')
const Vote = require('./resolvers/Vote')
const User = require('./resolvers/User')
const Answer = require('./resolvers/Answer')

const { getUserId } = require('./utils')

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
    Question,
    Vote,
    User,
    Answer,
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'typeDefs.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        };
    },
})

server
    .listen()
    .then(({ url }) => console.log(`Server listening on ${url}`))