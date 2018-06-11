const { generate } = require('shortid')

const experience = {
  
  async createExperience(parent, args, ctx) {
    const { titre, description } = args
    const collection = ctx.mongo.db.collection('experiences')
    const id = generate()
    const r = await collection.insertOne({ id, titre, description })
    ctx.mongo.client.close()
    return {
      id,
      titre,
      description,
    }
  },

  async updateExperience(parent, args, ctx) {
    const { id, titre, description } = args
    const collection = ctx.mongo.db.collection('experiences')
    const experience = await collection.findOne({ id })

    experience.id = id
    experience.titre = titre ? titre : experience.titre
    experience.description = description ? description : experience.description

    const r = await collection.updateOne({ id }, { $set: { ...experience } })

    ctx.mongo.client.close()

    return experience
  },

  async deleteExperience(parent, { id }, ctx) {
    const collection = ctx.mongo.db.collection('experiences')
    await collection.deleteOne({ id })
    return id
  },

}

module.exports = { experience }