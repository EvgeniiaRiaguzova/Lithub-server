const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");
const Comment = require('../models/Comment.model');
const Book = require('../models/Book.model');
const User = require("../models/User.model");


//  Creates a new comment
router.post('/comments', isAuthenticated, (req, res, next) => {
 
  
  const userId = req.payload._id
  const { user, comment, book } = req.body;

  Comment.create({ user: userId, comment, book })
    .then(newComment => {
      return Book.findByIdAndUpdate(book, { $push: { comments: newComment._id } } );
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// all of the books
router.get('/comments', (req, res, next) => {
  Book.find()
    .populate('comments')
    .then(allBooks => res.json(allBooks))
    .catch(err => res.json(err));
});


/*router.get('/:id/comment', (req, res, next) => {

  const {id} = req.params

Book.findById(id)

  .then(foundConcert => res.render('books/comment', foundBook))
  .catch(err => console.log(err))

});

router.post('/:bookId/comment', isAuthenticated, (req, res, next) => {
  console.log(req.payload._id)

  const userId = req.payload._id
  const {comment} = req.body
  console.log(comment)
  
  const {bookId} = req.params
  console.log("USER ID", userId)

  if (!comment) {
      res.render('/:id/comment', { errorMessage: 'Please write a comment before sending the form.' });
      return;
    }

    Comment.create({user: userId, comment, book: bookId})
      .then((newComment) => {
        console.log(bookId)
          Book.findById(bookId)
          
              .then((commentedBook) => {
                  commentedBook.comments.push(newComment._id) 
                  commentedBook.save()
              })
              .catch(err => console.log(err))
      })
      .then(() => res.redirect('/bookss'))
      .catch(err => console.log(err))

});*/
//Delete comment
router.delete('/:commentsId', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({  message: 'Comment deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No comment found' }));
});

module.exports = router;



