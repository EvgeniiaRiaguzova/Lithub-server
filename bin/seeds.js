
const mongoose = require("mongoose");
const Book = require("../models/Book.model");

mongoose

  .connect(process.env.MONGODB_URI)

  .then((x) => {

    console.log(

      `Connected to Mongo with initial data! Database name: "${x.connections[0].name}"`

    );

  })

  .catch((err) => {

    console.error("Error connecting to mongo: ", err);

  });

const books = [
    {  
        "title" : "my first book",  
        "description" : "Its a interesting book, my first expirience", 
        "imageUrl": "/images/no-cover.png",
        "author" : "Andy Connor",  
        "gerne" : "Romance", 
        "contense" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibuset magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, tellus eget", 
    },
    {  
        "title" : "Mouse",  
        "description" : " a great story about mouses...", 
        "imageUrl": "/images/no-cover.png",
        "author" :"Mikkey Maus",  
        "gerne" : "Drama", 
        "contense" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibuset magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, tellus eget", 
    },
    {  
        "title" : "Fairy tales",  
        "description" : "Different stories...", 
        "imageUrl": "/images/no-cover.png",
        "author" : "Hans Christian Andersen",  
        "gerne" : "Fantasy", 
        "contense" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibuset magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, tellus eget", 
    },
     {  
        "title" : "Pride and Prejudice",  
        "description" : "Story about women...", 
        "imageUrl": "/images/no-cover.png",
        "author" : "Jane Austen",  
        "gerne" : "Science", 
        "contense" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibuset magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, tellus eget", 
    },
    {  
        "title" : "Absalom, Absalom!",  
        "description" : "Sauron sends a great army against Gondor. Gandalf arrives at Minas Tirith to warn Denethor of the attack, while Théoden musters the Rohirrim to ride to Gondor's aid...", 
        "imageUrl": "/images/no-cover.png",
        "author" : "William Faulkner",  
        "gerne" : "Drama", 
        "contense" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibuset magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, tellus eget", 
    },
    {  
        "title" : "Middlemarch",  
        "description" : "Sauron sends a great army against Gondor. Gandalf arrives at Minas Tirith to warn Denethor of the attack, while Théoden musters the Rohirrim to ride to Gondor's aid...", 
        "imageUrl": "/images/no-cover.png",
        "author" : "George Eliot",  
        "gerne" : "Romance", 
        "contense" : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibuset magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, tellus eget", 
    }
]

