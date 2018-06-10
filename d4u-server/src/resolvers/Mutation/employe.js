const { promisify } = require('bluebird')
const { generate } = require('shortid')

const employe = {

  async createEmploye(parent, args, ctx) {
    const { nom, prenom, age, poste, experience } = args
    const collection = ctx.mongo.db.collection('employes')
    const id = generate()
    const r = await collection.insertOne({ id, nom, prenom, age, poste, experience })
    ctx.mongo.client.close()
    return {
      id,
      nom, 
      prenom, 
      age, 
      poste,
      experience,
    }
  },

  async updateEmploye(parent, args, ctx) {
    const { id, nom, prenom, age, poste, experience } = args
    const collection = ctx.mongo.db.collection('employes')
    const employe = await collection.findOne({ id })

    employe.id = id
    employe.nom = nom ? nom : employe.nom
    employe.prenom = prenom ? prenom : employe.prenom
    employe.age = nom ? age : employe.age
    employe.poste = poste ? poste : employe.poste
    employe.experience = experience ? experience : employe.experience

    const r = await collection.updateOne({ id }, { $set: { ...employe } })

    ctx.mongo.client.close()

    return employe
  },

  async deleteEmploye(parent, { id }, ctx) {
    const collection = ctx.mongo.db.collection('employes')
    await collection.deleteOne({ id })
    return id
  },

}

module.exports = { employe }