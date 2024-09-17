// src/middlewares/validation.js

const { body, param } = require("express-validator");

const registerUserValidation = [
  body("firstName")
    .isAlphanumeric()
    .withMessage("First name must be alphanumeric"),
  body("lastName")
    .isAlphanumeric()
    .withMessage("Last name must be alphanumeric"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phoneNumber")
    .isNumeric()
    .withMessage("Contact number must be numeric"),
  body("postcode").isNumeric().withMessage("Postcode must be numeric"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  body("city").notEmpty().withMessage("City is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("hobbies").notEmpty().withMessage("Hobbies must be a name"),
];

const getUserByIdValidation = [
  param("id").isInt().withMessage("User ID must be an integer"),
];

const updateUserValidation = [
  param("id").isInt().withMessage("User ID must be an integer"),
  body("firstName")
    .optional()
    .isAlphanumeric()
    .withMessage("First name must be alphanumeric"),
  body("lastName")
    .optional()
    .isAlphanumeric()
    .withMessage("Last name must be alphanumeric"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("phoneNumber")
    .optional()
    .isNumeric()
    .withMessage("Phone number must be numeric"),
  body("postcode")
    .optional()
    .isNumeric()
    .withMessage("Postcode must be numeric"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("confirmPassword")
    .optional()
    .custom((value, { req }) => {
      if (value && value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  body("city").optional().notEmpty().withMessage("City is required"),
  body("state").optional().notEmpty().withMessage("State is required"),
  body("hobbies")
    .optional()
    .notEmpty()
    .withMessage("Hobbies must be a string"),
  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be one of: male, female, other"),
  body("roleId").optional().isInt().withMessage("Role ID must be an integer"),
];

const loginUserValidation = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  registerUserValidation,
  getUserByIdValidation,
  updateUserValidation,
  loginUserValidation,
};
