const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${response.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDb;
