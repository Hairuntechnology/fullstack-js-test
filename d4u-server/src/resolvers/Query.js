const Query = {

  hello(root, args, context) {
    return 'Hello World!'
  },

  async findEmployes (parent, args, ctx) {
    const collection = ctx.mongo.db.collection('employes')
    const employes = await collection.find({}).toArray()
    return employes
  },

  async findEmployeById (parent, { id }, ctx) {
    const collection = ctx.mongo.db.collection('employes')
    return collection.findOne({ id })
  },

  async findExperiences (parent, args, ctx) {
    const collection = ctx.mongo.db.collection('experiences')
    const experiences = await collection.find({}).toArray()
    return experiences
  },

  async findExperienceById (parent, { id }, ctx) {
    const collection = ctx.mongo.db.collection('experiences')
    return collection.findOne({ id })
  },

}

module.exports = { Query }