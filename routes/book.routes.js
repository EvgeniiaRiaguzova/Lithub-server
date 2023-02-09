const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const isLoggedIn = require('../middleware/isLoggedIn')
const fileUploader = require("../config/cloudinary.config");

const Booke = require('../models/Book.model');
const Comment = require('../models/Comment.model'); 
const User = require('../models/User.model');


router.get('/books', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});


router.get('books/:booksId', (req, res) => {
  Book.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});


router.post('/books', (req, res) => {
  Book.create(req.body)
    .then(book => res.json({  message: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

//update book
router.put('books/:booksId', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({  message: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

//Delete book
router.delete('books/:booksId', (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({  message: 'Book deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No book found' }));
});

module.exports = router;