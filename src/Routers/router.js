const express = require("express");
const {
  validateFieldUser,
  isEmailAlreadyExists,
  validateFieldsLogin,
} = require("../Middleware/validator");
const { registerUser, getUser } = require("../Controller/users");
const login = require("../Controller/login");
const verifyToken = require("../Middleware/auth");
const router = express();

router.post("/users", validateFieldUser, isEmailAlreadyExists, registerUser);

router.post("/login", validateFieldsLogin, login);

router.use(verifyToken, getUser);

module.exports = router;
