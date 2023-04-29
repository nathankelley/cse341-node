// initiate dotenv file
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tvz5d6x.mongodb.net/?retryWrites=true&w=majority`;

let _db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useUnifiedTopology: true
    }
});

const run = () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        client.connect();
        _db = client;
    } catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        client.close();
    }
};

// list databases test
const listDatabases = (_db) => {
    databasesList = _db.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// get DB information
const getDB = () => {
    if (!_db) {
        throw Error('No DB found!');
    }
    return _db;
};


//run().catch(console.dir);

module.exports = {
    run,
    getDB,
    listDatabases
};
