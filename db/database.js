const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "docs";
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Caron92:<Caqup12345>@cluster0.hu7vr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const database = {
    getDb: async function getDb () {
        let dsn = `mongodb://localhost:27017/folinodocs`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            collection: collection,
            client: client,
        };
    }
};

module.exports = database;