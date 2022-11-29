const express = require("express");
const router = express.Router();

const announceController = require("../controllers/announceController");
const bookingController = require("../controllers/bookingController");
const userAuth = require("../middleware/userAuthMiddleware");
const userController = require("../controllers/userController");

//user
router.get("/getUser", userAuth, userController.getUser);
router.post("/login", userController.login);
router.post("/register", userController.register);

//announce
router.get("/getAnnounce", announceController.getAnnounce);

//bookings
router.post("/addbooking", userAuth, bookingController.addBooking);
router.get("/getUserBooking", userAuth, bookingController.getUserBookings);

module.exports = router;
