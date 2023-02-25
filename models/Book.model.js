const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  
  
  title: { type: String, required: true, unique: true },
  
  
  description: {
    type: String
  },

  
  bookImage: {
    type: String,
    default:`book-cover-placeholder.png`
  },

  author: { type: Schema.Types.ObjectId, ref: 'User' },

  genre:{type: String },
  
  
  content: {type: String},

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