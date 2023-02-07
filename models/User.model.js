const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 
      'Please use a valid email address.'],
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
   bio: {
    type: String,
   },
   profileImage: {
    type: String,
    default: "assets/defaul-user-img.png"
   },
   status: 
   {
    type: String,
    enum: ["Author", "Reader"],
    required: [true, 'Status is required.']
   },
    books: [{type: Schema.Types.ObjectId, ref: "Book"}]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;






