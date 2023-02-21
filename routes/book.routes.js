const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');



const Book = require('../models/Book.model');
const Comment = require('../models/Comment.model'); 
const User = require('../models/User.model');


router.get('/', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});


router.get('/:booksId', (req, res) => {

  Book.findById(req.params.booksId)

    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Book found' }));
});


router.post('/', isAuthenticated , async (req, res) => {
console.log("the payload" ,req.payload)
  const bookCreated = {
    title: req.body.title,
    genre:req.body.genre,
    description:req.body.description,
    author: req.payload._id
  }

  const book = await Book.create(bookCreated)

  const user = await User.findById(req.payload._id)
  user.books.push(book._id)
  await user.save()

  res.json({message: 'Book added successfully'})
  
/*
  Book.create(bookCreated)
    .then(book => user.books.push(book._id))
    .then( res.json({  message: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this book' }));
    */
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