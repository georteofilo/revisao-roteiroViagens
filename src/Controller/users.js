const db = require("../Config/database");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passCrypt = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: passCrypt,
    };

    const response = await db("users")
      .insert(newUser)
      .returning(["id", "name", "email"]);

    return res.status(201).json(response[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

const getUser = async (req, res) => {
  const { user } = req;
  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { user } = req;

  try {
    const passCrypt = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: passCrypt,
    };

    const response = await db("users")
      .update(newUser)
      .where("id", "=", user.id)
      .returning(["id", "name", "email"]);

    return res.status(200).json(response[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

module.exports = {
  registerUser,
  getUser,
  updateUser,
};
