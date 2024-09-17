// src/routes/user.routes.js

const express = require("express");
const {
  registerUser,
  getUserById,
  getAllUsers,
  updateUser,
  loginUser,
} = require("../controllers/user.controller");
const {
  registerUserValidation,
  getUserByIdValidation,
  updateUserValidation,
  loginUserValidation,
} = require("../validation/validation");

const router = express.Router();

// User route
router.post("/register", registerUserValidation, registerUser);

// Get user by ID route
router.post("/user/:id", getUserByIdValidation, getUserById);

// Get all users route
router.get("/data", getAllUsers);

// Update user route
router.put("/update/:id", updateUserValidation, updateUser);

// User login route
router.post("/login", loginUserValidation, loginUser);

//For passport 😉

// router.get("/data", passport.authenticate("jwt", { session: false }), getAllUsers);
// router.post("/user/:id", passport.authenticate("jwt", { session: false }), getUserById);
// router.put("/update/:id", passport.authenticate("jwt", { session: false }), updateUser);

module.exports = router;
