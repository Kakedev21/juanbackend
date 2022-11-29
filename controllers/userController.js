const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//genarate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Success!",
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({
        error: "ERR_DUPLICATE_EMAIL",
      });
    }
    res.status(400).json({
      error: "ERR_UNKNOWN",
    });
  }
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id);
    res.cookie("token", token);
    res.status(200);
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isBooked: user.isBooked,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id, username, email, isBooked } = req.user;

  res.status(200).json({
    id,
    username,
    email,
    isBooked,
  });
});

module.exports = { register, login, getUser };
