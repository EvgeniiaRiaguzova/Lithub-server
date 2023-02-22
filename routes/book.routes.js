const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



const Book = require('../models/Book.model');
const Comment = require('../models/Comment.model'); 
const User = require('../models/User.model');


router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});


router.get('/:booksId', (req, res) => {

  Book.findById(req.params.booksId).populate("comments").populate("author")

    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});

//        /api/books
router.post('/', (req, res) => {
  console.log("heeey")
  Book.create(req.body)
    .then(book => res.json({  message: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
});

//update book
router.put('/:booksId', (req, res) => {

  Book.findByIdAndUpdate(req.params.booksId, req.body)

    .then(book => res.json({  message: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

//Delete book
router.delete('/:booksId', (req, res) => {

  Book.findByIdAndRemove(req.params.booksId, req.body)

    .then(book => res.json({  message: 'Book deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No book found' }));
});

module.exports = router;