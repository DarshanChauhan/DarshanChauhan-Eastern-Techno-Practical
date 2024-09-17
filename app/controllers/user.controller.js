const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Role, Sessions } = require("../models");
const paginate = require("../utils/paginationHelper");

// User controller
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    postcode,
    password,
    hobbies,
    gender,
    city,
    state,
    roleId,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      postcode,
      password: hashedPassword,
      hobbies,
      gender,
      city,
      state,
      roleId,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};

// Get user by ID controller
const getUserById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id },
      include: [{ model: Role, as: "role" }],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

// Get all users controller
const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const users = await User.findAll({});
    if (!users) {
      return res.status(404).json({ error: "Users not found." });
    }
    const userArray = users.map((user) => user.dataValues);
    const result = await paginate(userArray, { page, limit });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

// Update user controller
const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    postcode,
    password,
    hobbies,
    gender,
    city,
    state,
    roleId,
    confirmPassword,
  } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (password) {
      if (confirmPassword && confirmPassword !== password) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.postcode = postcode || user.postcode;
    user.hobbies = hobbies || user.hobbies;
    user.gender = gender || user.gender;
    user.city = city || user.city;
    user.state = state || user.state;
    user.roleId = roleId || user.roleId;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during update" });
  }
};

// User login controller
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const sessions = await Sessions.findOne({ where: { userId: user.id } });
    if (sessions) {
      await Sessions.destroy({ where: { id: sessions.id } });
      // Delete Old record  for instant log out Fucntionality 😉 +1
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    await Sessions.create({
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 3600000),
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = {
  registerUser,
  getUserById,
  getAllUsers,
  updateUser,
  loginUser,
};
