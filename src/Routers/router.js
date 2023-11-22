const express = require("express");
const {
  validateFieldUser,
  isEmailAlreadyExists,
} = require("../Middleware/validator");
const { registerUser } = require("../Controller/users");
const router = express();

router.post("/users", validateFieldUser, isEmailAlreadyExists, registerUser);

module.exports = router;
