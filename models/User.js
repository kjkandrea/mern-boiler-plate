const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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

const User = mongoose.model('User', userSchema)

module.exports = { User }