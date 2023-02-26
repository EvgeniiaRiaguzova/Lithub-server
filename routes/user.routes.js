const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const fileUploader = require("../config/cloudinary.config");

//USER DISPLAY 
router.get("/profile", isAuthenticated, (req, res, next) => {
   // const { username, email, bio, profileImage, status } = req.body;
    const userId = req.payload._id;
  

    
   User.findById(userId).populate('books')
        .then((userFound) => {console.log(userFound) ;
            res.json(userFound)})
        .catch(err => console.error(err))
});

//USER UPDATE
router.put("/edit", isAuthenticated, fileUploader.single("profileImage"), (req, res, next) => {
    const { username, email, bio, profileImage, status } = req.body;
    const userId = req.payload._id;
 

    User.findByIdAndUpdate(userId, { username, email, bio, profileImage, status }, { new: true}).populate('books')
        .then( ({_id, username, email, bio, profileImage, status, books}) => res.json({_id, username, email, bio, profileImage, status, books}))
       .catch(err => console.error(err)) 
});

//USER DELETE
router.delete("/delete", isAuthenticated, (req, res, next) => {

    const userId = req.payload._id;

    User.findByIdAndRemove(userId)
        .then(() => {
         
            res.json('user deleted')
         
        } )
        .catch(err => console.error(err))
});


module.exports = router;