require('dotenv')
const express = require('express')
const cors = require('cors')
const router = require('./Routers/router')
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`Servidor na porta ${port}`)
})