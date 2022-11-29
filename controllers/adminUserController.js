const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const AdminUser = require("../models/adminUserModel");

//generate jwt
const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const addAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide username and password");
  }

  const existingAdmin = await AdminUser.findOne({ username });

  if (existingAdmin) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create admin
  const admin = await AdminUser.create({
    username,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201);
    res.json({
      id: admin._id,
      username: admin.username,
      token: generateJwt(admin._id),
    });
  } else {
    res.status(500);
    throw new Error("Error creating admin please try again");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const adminUser = await AdminUser.findOne({ username });

  if (adminUser && (await bcrypt.compare(password, adminUser.password))) {
    res.status(200);
    res.json({
      id: adminUser._id,
      username: adminUser.username,
      token: generateJwt(adminUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const getAdmin = asyncHandler(async (req, res) => {
  const { id, username } = req.admin;

  res.status(200).json({
    id,
    username,
  });
});

//filter all approved users
const getApprovedUsers = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ status: "Approved" });
  res.status(200).json(booking);
});

const getRejectedUsers = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ status: "rejected" });
  res.status(200).json(booking);
});

const getpendingUsers = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ status: "pending" });
  res.status(200).json(booking);
});

//count all user
const countUser = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

module.exports = {
  adminLogin,
  getAdmin,
  addAdmin,
  getApprovedUsers,
  getRejectedUsers,
  getpendingUsers,
  countUser,
};
