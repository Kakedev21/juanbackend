const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminUserModel");
const asyncHandler = require("express-async-handler");

const adminAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await AdminUser.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

module.exports = adminAuth;
