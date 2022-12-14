const Announcement = require("../models/announceModel");
const asyncHandler = require("express-async-handler");

const addAnnounce = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide text");
  }

  const announce = await Announcement.create({
    text: req.body.text,
  });
  res.status(200).json(announce);
});

const updateAnnounce = asyncHandler(async (req, res) => {
  const announce = await Announcement.findById(req.params.id);

  if (!announce) {
    res.status(404);
    throw new Error("Announcement not found");
  }

  const updatedAnnounce = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedAnnounce);
});

const getAnnounce = asyncHandler(async (req, res) => {
  //get all announcements
  const announcements = await Announcement.findOne().limit(1);

  res.status(200).json(announcements);
});

module.exports = { addAnnounce, updateAnnounce, getAnnounce };
