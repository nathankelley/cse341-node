const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


// GET all contacts
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('project_1').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};


// GET single contact
const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('project_1')
    .collection('contacts')
    .find({_id: userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};


// POST (write) a contact to the db
const writeContact = async (req, res) => {
  const contact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    email: req.body.email,
    favoriteFood: req.body.favoriteFood
  };
  const response = await mongodb.getDb().db('project_1').collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};


// UPDATE a contact in the db
const updateContact = async (req, res) => {
const userId = new ObjectId(req.params.id);

  const contact = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday: req.body.birthday,
    email: req.body.email,
    favoriteFood: req.body.favoriteFood
  }
  const response = await mongodb
    .getDb()
    .db('project_1')
    .collection('contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating.');
  }
}


// DELETE a contact from the db
const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('project_1').collection('contacts').remove({ _id: userId }, true);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while deleting.');
  }
}


module.exports = { getAll, getSingle, writeContact, updateContact, deleteContact };