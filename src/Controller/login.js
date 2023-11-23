const db = require('../Config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await db('users').select("*").where({email}).first()

    if(!user || user.length === 0){
      return res.status(400).json({ message: "Email não encontrado"})
    }
    console.log(user)
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword){
      return res.status(400).json({ message: "Email ou/e senha inválido."})
    }


    const token = await jwt.sign({id: user.id}, process.env.JWT_SENHA, {expiresIn: "2h"})

    const { password: _, ...userLogin } = user

    return res.status(200).json({user: userLogin, token})

  } catch (error) {
    console.log(error.message)
    return res.status(500)
  }
}

module.exports = login