const { MongoClient } = require('mongodb')

const url = process.env.MONGO_URL || 'mongodb://localhost:27017'

const dbName = 'd4u'
 
function connect () {
  return new Promise((resolve, reject) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
      if (err)
        return reject(err)
      console.log("Connected successfully to server");
    
      const db = client.db(dbName);
      resolve({ client, db })    
      // client.close();
    })
  })
}

module.exports = { connect }