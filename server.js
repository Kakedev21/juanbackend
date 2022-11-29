const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/db");
const cookieparser = require("cookie-parser");

//connect to mongoDB
connectDb();

const app = express();

//third party middleware
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    exposedHeaders: ["Set-Cookie", "Date", "ETag"],
    origin: "https://juanfrontend.onrender.com",
  })
);
app.use(cookieparser());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/admin", require("./routes/adminRoute"));
app.use("/user", require("./routes/userRoute"));

//serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}
//error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
