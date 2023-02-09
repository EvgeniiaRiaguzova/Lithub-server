const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const commentSchema = new Schema(
{
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    comment: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
},
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;