# mern-boiler-plate

## server

### bcrypt

[npm : bcrypt](https://www.npmjs.com/package/bcrypt)

bcrypt란? bcrpyt는 암호화 모듈이다. 패스워드의 hash값을 구하고 비교할 수 있다.

```
npm install bcrypt --save
```

```
const bcrypt = require('bcrypt')
const saltRounds = 10

bcrypt.genSalt(saltRounds, function(err, salt) {
  if(err) return next(err)
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
      // Store hash in your password DB.
  });
});
```