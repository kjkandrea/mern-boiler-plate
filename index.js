const express = require('express')
const app = express()
const port = 5000
const masterKey = require('./password')

const mongoose = require('mongoose')
mongoose.connect(masterKey.MongoDB.code, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))