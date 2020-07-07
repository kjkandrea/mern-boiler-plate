const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token : {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function (next) {
  var user = this; // this = userSchema

  // password가 변경된다면
  if(user.isModified('password')) {
    // password를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if(err) return next(err)
        // hash = 암호화된 password
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparePassword = function(plainPassword, callback) {
  // 패스워드와 암호화된 패스워드가 일치하는지 체크

  // this = userSchema
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return callback(err)
    callback(null, isMatch)
  });
}

userSchema.methods.generateToken = function(callback) {
  var user = this; // this = userSchema

  // jsonwebtoken을 이용하여 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken')

  user.token = token
  user.save(function(err, user) {
    if(err) return callback(err)
    callback(null, user)
  })
}

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  // 토큰을 복호화(decode) 한다.
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // decoded = 유저 아이디 (user._id)

    // 유저 아이디를 이용하여 데이터베이스 user스키마에서 일치하는 유저를 찾는다.
    user.findOne({
      "_id": decoded,
      "token": token
    }, function (err, user) {
      if (err) return callback(err)
      callback(null, user)
    })

    // 고유 아이디가 일치하는 user row가 받아온 token을 가지고 있는지 확인한다.
  }) 
}

const User = mongoose.model('User', userSchema)

module.exports = { User }