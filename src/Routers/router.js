const express = require("express");
const {
  validateFieldUser,
  isEmailAlreadyExists,
  validateFieldsLogin,
} = require("../Middleware/validator");
const { registerUser } = require("../Controller/users");
const login = require("../Controller/login");
const router = express();

router.post("/users", validateFieldUser, isEmailAlreadyExists, registerUser);

router.post("/login", validateFieldsLogin, login);

module.exports = router;

