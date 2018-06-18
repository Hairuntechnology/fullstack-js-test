const { GraphQLServer } = require('graphql-yoga')
const morgan = require('morgan')
const cors = require('cors')
const resolvers = require('./resolvers')

const { connect } = require('./db')

const typeDefs = 'src/schema.graphql'
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: async req => ({
        ...req,
        mongo: await connect() 
    })
})


server.express.use(morgan('dev'))
server.express.use(cors())

const options = {
    port: process.env.NODE_PORT || 4001
}

server.start(options,  () => console.log(`Server is running on http://localhost:${options.port}`))