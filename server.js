const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
//const passport = require("./app/config/passportConfig");

dotenv.config();
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const router = require("./app/routes/index.routes");

// app.use(passport.initialize()); // Initialize Passport
app.use("/api", router); // Attach Main router

// drop the table if it already exists (Debv purpose)
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// set port, listen for requests
const PORT = process.env.PORT || 7866;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// Instagram : drsn_7866😉✅
