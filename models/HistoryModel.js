import mongoose from "mongoose";

const historySchema = mongoose.Schema({
  userHistory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

module.exports = mongoose.model("History", historySchema);
