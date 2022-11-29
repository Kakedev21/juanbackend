const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const addBooking = asyncHandler(async (req, res) => {
  console.log(req.cookies.token);
  const { fullname, email, contact, address, companions, arrival, departure } =
    req.body;

  if (
    !fullname ||
    !email ||
    !contact ||
    !address ||
    !companions ||
    !arrival ||
    !departure
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //dont booked if user already booked
  const user = await User.findById(req.user._id);

  const booking = await Booking.create({
    user: req.user._id,
    fullname,
    email,
    contact,
    address,
    companions,
    arrival,
    departure,
  });

  user.isBooked = true;
  await user.save();

  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(500);
    throw new Error("Something went wrong please try again");
  }
});

//isBooked
// const isBooked = asyncHandler(async (req, res) => {
//   //find if they have a booking
//   const booking = await Booking.findOne({ user: req.user._id });
//   const user = await User.findById(req.user._id);
//   if (user && booking) {
//     user.isBooked = true;
//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } else {
//     res.status(404);
//     throw new Error("No booking found");
//   }
// });

//edit booking status
const editBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  let returnData = {
    id: null,
    status: "",
  };
  if (booking) {
    returnData.id = id;
    returnData.status = booking.status;
    res.status(200).json(returnData);
  } else {
    res.status(400);
    throw new Error("Something went wrong please try again");
  }
});

//get all bookings
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();

  res.status(200).json(bookings);
});

//get booking by month
const getBookingsCount = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();
  const months = [
    {
      month: "January",
      booked: 0,
    },
    {
      month: "February",
      booked: 0,
    },
    {
      month: "March",
      booked: 0,
    },
    {
      month: "April",
      booked: 0,
    },
    {
      month: "May",
      booked: 0,
    },
    {
      month: "June",
      booked: 0,
    },
    {
      month: "July",
      booked: 0,
    },
    {
      month: "August",
      booked: 0,
    },
    {
      month: "September",
      booked: 0,
    },
    {
      month: "October",
      booked: 0,
    },
    {
      month: "November",
      booked: 0,
    },
    {
      month: "December",
      booked: 0,
    },
  ];

  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const date = new Date(booking.createdAt);
    const month = date.getMonth();
    months[month].booked++;
  }

  res.status(200).json(months);
});

9; //get user's booking
const getUserBookings = asyncHandler(async (req, res) => {
  const booking = await Booking.find({ user: req.user.id });

  res.status(200).json(booking);
});

//count all booking
const countBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();

  res.status(200).json(bookings.length);
});

//get booking today
const getBookingToday = asyncHandler(async (req, res) => {
  const bookings = await Booking.find();

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const todayBookings = bookings.filter((booking) => {
    const date = new Date(booking.createdAt);
    const dateDate = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    if (
      dateDate === todayDate &&
      dateMonth === todayMonth &&
      dateYear === todayYear
    ) {
      return booking;
    }
  });

  res.status(200).json(todayBookings.length);
});

module.exports = {
  addBooking,
  getBookings,
  getBookingsCount,
  editBooking,
  getUserBookings,
  countBookings,
  getBookingToday,
};
