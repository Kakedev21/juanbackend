const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    companions: {
      type: Number,
      required: [true, "Companions is required"],
    },
    arrival: {
      type: String,
      required: [true, "Arrival is required"],
    },
    departure: {
      type: String,
      required: [true, "Departure is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
