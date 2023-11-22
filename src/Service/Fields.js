const validateName = (name) =>  !!name

const validateEmail = (email) => !!email

const validatePassword = (pass) => !!pass

module.exports = {
  validateName,
  validateEmail,
  validatePassword
}