/**
 * Connect to the database and search using a criteria.
 */
 "use strict";
 
 // MongoDB
 const mongo = require("mongodb").MongoClient;
 const dsn =  process.env.DBWEBB_DSN || "mongodb://127.0.0.1:27017/DocumentProject";
 const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Caron92:<password>@cluster0.hu7vr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


 // Express server
 const port = process.env.PORT || 1338;
 const express = require("express");
 const app = express();
 const path = require('path');

 var bodyParser = require('body-parser'); 
 var urlencodedParser = bodyParser.urlencoded({ extended: false })   

 
 // CONSTANT GLOBAL VARIALBES USED BY FUNCTIONS AT THE BOTTOM.
const colName = "Document"

 
 // HERE ARE ALL THE ROUTES USED BY THE SERVER
 


 // Root directory, ideally frontend editor ends up being here.
 app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/home.html'));
    
  });

  app.post('/', urlencodedParser, async function (req, res) {  
    
    const projection = {  
        name:req.body.name,  
        content:req.body.content  
    };  
    console.log(projection);  
    res.end(JSON.stringify(projection));  
    res = await insertToCollection(dsn, colName, projection);
    // res.redirect(`/`);
});


 //app.post? Where we CREATE a new document. Gör detta sist!
 //const docName = "nytt_dokument";
 //const docContent = "Jag testar att ladda upp ett nytt dokument"; 

// Return a JSON object with specific name OPEN
 app.get("/list/:name", async (request, response) => {
    try {
        let name = request.params.name;
        const projection = {
            "name": 1,
            "content": 1,
            "_id": 0
        };

        const query = {
            "name": name 
        };


         let res = await findInCollection(dsn, colName, query, projection, 100);
 
         console.log(res);
         response.json(res);
     } catch (err) {
         console.log(err);
         response.json(err);
     }
});

 
 // Return a JSON object with list of all documents within the collection.
 app.get("/list", async (request, response) => {
     try {

        const projection = {
            "name": 1,
            "_id": 0
        };


         let res = await findInCollection(dsn, colName, {}, projection, 100);
 
         console.log(res);
         response.json(res);
     } catch (err) {
         console.log(err);
         response.json(err);
     }
 });


 
 // Startup server and liten on port
 app.listen(port, () => {
     console.log(`Server is listening on ${port}`);
     console.log(`DSN is: ${dsn}`);
 });
 

 //HERE ARE ALL THE FUNCTIONS.
/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria).project(projection).limit(limit).toArray();

    await client.close();

    return res;
}

async function insertToCollection(dsn, colName, criteria, projection) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.insert(criteria).project(projection).toArray();

    await client.close();

    return res;
}