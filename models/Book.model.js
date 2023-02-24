const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  
  
  title: { type: String, required: true, unique: true },
  
  
  description: {
    type: String
  },

  
  bookImage: {
    type: String,
    default:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/teal-and-orange-fantasy-book-cover-design-template-056106feb952bdfb7bfd16b4f9325c11.jpg?ts=1637018051"
  },

  author: { type: Schema.Types.ObjectId, ref: 'User' },

  gerne:{type: String },
  
  
  contense: {type: String },

  comments: [
  {     type :mongoose.Schema.Types.ObjectId ,
        ref:"Comment"                         
  }  ],
  
    },
{
  timestamps: true
}
);


const Book = mongoose.model("Book", bookSchema);

module.exports = Book;