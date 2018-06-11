const { Query } = require('./Query')
const { employe } = require('./Mutation/employe')
const { experience } = require('./Mutation/experience')

module.exports = {
    Query,
    Mutation: {
        ...employe,
        ...experience,
    }
}
