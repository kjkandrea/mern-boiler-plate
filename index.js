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

  user.save((err, user) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에서 찾는다.

  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일에 해당하는 유저가 없습니다."
      })
    }

    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인한다.

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({ 
          oginSuccess: false,
          message: "비밀번호가 일치하지 않습니다."
        })
      }

      // 비밀번호까지 맞다면 토큰을 생성한다.
      
      user.generateToken((err, user) => {
        
      })
    })
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))