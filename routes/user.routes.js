const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//USER DISPLAY 
router.get("/profile", isAuthenticated, (req, res, next) => {
   // const { username, email, bio, profileImage, status } = req.body;
    const userId = req.payload._id;
    res.status(200).json(req.payload);

    
    User.findById(userId)
        .then((userFound) => res.json(userFound))
        .catch(err => console.error(err))
});
//test
//USER UPDATE
router.put("/edit", isAuthenticated, (req, res, next) => {
    const { username, email, bio, profileImage, status } = req.body;
    const userId = req.payload._id;
    console.log(userId)

    User.findByIdAndUpdate(userId, { username, email, bio, profileImage, status }, { new: true})
        .then( ({_id, username, email, bio, profileImage, status}) => res.json({_id, username, email, bio, profileImage, status}))
       .catch(err => console.error(err)) 
});

//USER DELETE
router.delete("/delete", isAuthenticated, (req, res, next) => {
  console.log("hello delete")
    const userId = req.payload._id;

    User.findByIdAndRemove(userId)
        .then(() => {
            console.log("before the redi")
            res.json('user deleted')
            console.log("after the redi")
        } )
        .catch(err => console.error(err))
});


module.exports = router;