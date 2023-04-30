// initiate dotenv file
const dotenv = require("dotenv");
dotenv.config();

const mongoClient = require('mongodb').MongoClient;

// global db variable
let _db;

const initDb = callback => {
    if (_db) {
      console.log('Db is already initialized!');
      return callback(null, _db);
    }
    mongoClient .connect(process.env.MONGODB_URI)
      .then(client => {
        _db = client;
        callback(null, _db);
      })
      .catch(err => {
        callback(err);
      });
  };
  
  const getDb = () => {
    if (!_db) {
      throw Error('Db not initialized');
    }
    return _db;
  };
  
// for testing
async function listDatabases(_db) {
    databasesList = await _db.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = {
    initDb,
    getDb
};
