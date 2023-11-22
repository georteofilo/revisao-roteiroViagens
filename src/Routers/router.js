const express = require('express')
const router = express()

router.get("/", (req, res) => {
  return res.status(200).json({ mensagem: "tudo ok"})
})

module.exports = router
