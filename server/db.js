const mongo = require('mongodb');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;

/* dotenv.config({path: './config.env'})

// Connection URL
const url = 'mongodb://localhost:27017';
console.log("URL", url)

// Database Name
const dbName = process.env.DB_NAME || 'toodo';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();  */



dotenv.config({path: './config.env'})


const uri = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
) 

const client = new MongoClient(uri, { useUnifiedTopology: true });

try {
    // Connect to the MongoDB cluster
    client.connect();

} catch (e) {
    console.error(e);
} finally {
    client.close();
}

const dbName = process.env.DB_NAME || 'toodo';

module.exports = {
   getClient : function() {
        return client;
    }, 
    getDB : function() {
        let client = module.exports.getClient();
        db = client.db(dbName);
        return db; 
       
    },
    createObjectId(id) {
        return new ObjectId(id)
    }
}

