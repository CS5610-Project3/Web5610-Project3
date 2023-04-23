require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
//const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/verifyJWT");
const logger = require("morgan");
const PORT = process.env.PORT || 3500;

// Connect to database
connectDB();

// app.use(credentials);

// Cross-origin resource sharing
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
app.use(cors());

// Built-in middleware - Body parser
app.use(express.urlencoded({ extended: true }));

// Built-in middleware - JSON parser
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for logging
app.use(logger("dev"));

// Routes
app.use("/api/users/", require("./routes/users"));
app.use("/api/posts/", require("./routes/posts"));


// Middleware for verifying JWT
app.use(verifyJWT);

mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
