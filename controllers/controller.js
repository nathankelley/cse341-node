const mongodb = require('../db/dbConnect');

const getData = async (req, res, next) => {
    const result = await mongodb.getDb().db('project_1').collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

module.exports = { getData };