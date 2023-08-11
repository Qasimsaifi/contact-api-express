const mongoose = require("mongoose");

const userScheme = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the user name,"],
    },
    email: {
      type: String,
      required: [true, "please add the email address,"],
      unique: [true, "Email is already register"],

    },
    password: {
      type: String,
      required: [true, "please add the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User" , userScheme)