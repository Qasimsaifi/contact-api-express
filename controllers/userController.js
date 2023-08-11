const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const dontenv = require("dotenv").config();

// Register user

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User with this email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(500);
      throw new Error("Failed to register user");
    }
  } catch (error) {
    // Handle any errors that occur during the registration process
    res.status(500).json({ error: error.message });
  }
});

// Login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) { // Fixed the condition here
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300000000000m" }
    );
    res.status(200).json({ access: accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});


// Get current user details


const currentUser = asyncHandler(async (req, res) => {

  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
