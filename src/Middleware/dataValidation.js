const db = require('../Config/database')
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../Service/usersService");

const validateFieldUser = (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!validateName(name)) {
      return res.status(400).json({ message: "O nome é obrigatório." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "O email é obrigatório." });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "A senha é obrigatória." });
    }
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
};

const isEmailAlreadyExists = async (req, res, next) => {
  const { email } = req.body
  const { user } = req

  try {
    let response

    if(!user) {
      response = await db('users')
      .select('id')
      .where({email})
    } else {
      response = await db('users')
      .select('id')
      .where({email})
      .andWhere("id", "<>", user.id)
    }

    if(response.length > 0){
      return res.status(400).json({ message: "Email já cadastrado"})
    }

    next()
  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

const validateFieldsLogin = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if(!validateEmail(email) || !validatePassword(password)){
      return res.status(400).json({ message: "Email ou/e senha obrigatórios."})
    }
    next()

  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}


module.exports = {
  validateFieldUser,
  isEmailAlreadyExists,
  validateFieldsLogin,
}