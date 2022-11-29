const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/adminUserController");
const adminAuth = require("../middleware/adminAuthMiddleware");
const announceController = require("../controllers/announceController");
const bookingController = require("../controllers/bookingController");

//admin user
router.post("/login", adminUserController.adminLogin);
router.get("/getAdmin", adminAuth, adminUserController.getAdmin);
router.post("/addAdmin", adminUserController.addAdmin);

//announcement
router.post("/addAnnounce", announceController.addAnnounce);
router.get("/getAnnounce", announceController.getAnnounce);
router.put("/updateAnnounce/:id", announceController.updateAnnounce);

//booking
router.get("/getBooking", bookingController.getBookings);
router.put("/updateBooking/:id", bookingController.editBooking);
router.get("/getBookingsCount", bookingController.getBookingsCount);
router.get("/getBookingToday", bookingController.getBookingToday);
router.get("/getApprovedUsers", adminUserController.getApprovedUsers);
router.get("/getRejectedUsers", adminUserController.getRejectedUsers);
router.get("/getpendingUsers", adminUserController.getpendingUsers);
router.get("/countUser", adminUserController.countUser);
router.get("/countBookings", bookingController.countBookings);

module.exports = router;
