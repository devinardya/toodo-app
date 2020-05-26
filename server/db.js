const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;
const dotenv = require('dotenv');

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

