const mongo = require('mongodb');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = process.env.DB_NAME || 'todolist';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect(); 

/* dotenv.config({path: './config.env'})

const dbName = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
) || process.env.DATABASE_LOCAL

const client = mongoose.connect(dbName,{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
.then(con => {
    console.log("connection", con.connections);
    console.log("connection success")
}) */

module.exports = {
    getClient : function() {
        return client;
    },
    getDB : function() {
        let client = module.exports.getClient();
        let db = client.db(dbName);
        return db;
    },
    createObjectId(id) {
        return new ObjectId(id)
    }
}

