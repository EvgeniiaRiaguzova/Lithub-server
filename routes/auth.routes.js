const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
 
const router = express.Router();
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');
const saltRounds = 10;
const fileUploader = require("../config/cloudinary.config");
 
// POST /auth/signup  - Creates a new user in the database
router.post('/signup', fileUploader.single("profileImage"), (req, res, next) => {
      const { username, email, password, bio, profileImage, status} = req.body;

     // res.json({ fileUrl: req.file.path });

    console.log("the req.body is", req.body)
    // Check if username or passwordor campus or course are provided as empty string 
    if (username === '' || password === '' || email === '' || status === '') {
      res.status(400).json({ message: "Provide username, password, email and status" });
      return;
    }
   
 // Use regex to validate the username format
 const usernameRegex = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
 if (!usernameRegex.test(username)) {
    console.log(username, usernameRegex.test(username))
   res.status(400).json({ message: 'Username must have between 6 and 20 characters ' });
   return;
 }

 // Use regex to validate the email format
 const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
 if (!emailRegex.test(email)) {
   res.status(400).json({ message: 'Provide a valid email address.' });
   return;
 }

    // Use regex to validate the password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    console.log (password)
    console.log (passwordRegex.test(password))
    if (!passwordRegex.test(password)) {
      res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }
   
   
    // Check the users collection if a user with the same username or email already exists
    User.findOne({username} || {email})
      .then((foundUser) => {
        // If the user with the same username or email already exists, send an error response
        if (foundUser) {
          res.status(400).json({ message: "User with such username or email address already exists." });
          return;
        }
   
        // If username and email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
   
        // Create the new user in the database
        // We return a pending promise, which allows us to chain another `then` 
        return User.create({ username, email, password: hashedPassword, 
            bio, profileImage, status});
      })
      .then((createdUser) => {
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        const {username, email, bio, profileImage, status, _id} = createdUser;
      
        // Create a new object that doesn't expose the password
        const user = {username, email, bio, profileImage, status, _id};
   
        // Send a json response containing the user object
        res.status(201).json({ user: user });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      });
  });
 
 
// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
   
    // Check if email or password are provided as empty string 
    if (email === '' || password === '') {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
   
    // Check the users collection if a user with the same email exists
    User.findOne({ email }).populate("books")
      .then((foundUser) => {
        if (!foundUser) {
          // If the user is not found, send an error response
          res.status(401).json({ message: "User not found." })
          return;
        }
   console.log(password, foundUser.password)
        // Compare the provided password with the one saved in the database
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
   
        if (passwordCorrect) {
          // Deconstruct the user object to omit the password
          const { _id, username, email, bio, profileImage, 
            status, books } = foundUser;
          
          // Create an object that will be set as the token payload
          const payload = { _id, username, email, bio, profileImage, 
            status, books};
   
          // Create and sign the token
          const authToken = jwt.sign( 
            payload,
            process.env.TOKEN_SECRET,
            { algorithm: 'HS256', expiresIn: "6h" }
          );
          console.log (authToken)
   
          // Send the token as the response
          res.status(200).json({ authToken: authToken });
        }
        else {
          res.status(401).json({ message: "Unable to authenticate the user" });
        }
   
      })
      .catch(err => res.status(500).json({ message: "Internal Server Error" }));
  });
 
 
// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {       
 
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and made available on `req.payload`
    console.log(`req.payload`, req.payload);
   
    // Send back the object with user data
    // previously set as the token payload
    res.status(200).json(req.payload);
  });







module.exports = router;