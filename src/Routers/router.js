const express = require("express");
const {
  validateFieldUser,
  isEmailAlreadyExists,
  validateFieldsLogin,
} = require("../Middleware/dataValidation");
const {
  registerUser,
  getUser,
  updateUser
} = require("../Controller/users");
const login = require("../Controller/login");
const verifyToken = require("../Middleware/auth");
const router = express();

router.post("/users", validateFieldUser, isEmailAlreadyExists, registerUser);

router.post("/login", validateFieldsLogin, login);

router.use(verifyToken);

router.get("/users", getUser);
router.put("/users", validateFieldUser, isEmailAlreadyExists, updateUser);

module.exports = router;
