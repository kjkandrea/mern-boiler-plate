const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')

const config = require('./config/key')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}))

// application/json
app.use(bodyParser.json())

console.log(config.mongoURI)

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello!'))


// 회원가입 라우트

app.post('/register', (req, res) => {
  
  // 회원가입할때 필요한 정보들을 client에서 받으면 그것을 데이터 베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))