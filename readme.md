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

## 로그인 회원가입 플로우

### 회원가입 (/register)

1. 클라이언트에서 유저의 이름, 이메일, 패스워드를 post 요청으로 받는다.
2. 패스워드를 bcrypt로 암호화 한다.
3. 유저의 이름, 이메일, 암호화된 패스워드를 user스키마에 저장한다.

### 로그인 (/login)

1. 클라이언트에서 유저의 이메일, 패스워드를 post 요청으로 받는다.
2. user스키마에서 일치하는 이메일을 데이터베이스에서 찾는다.
   * 일치하지 않으면 실패를 반환한다.
   * 일치한다면 다음단계
3. 비밀번호가 맞는 비밀번호 인지 확인한다. 이 부분에서 평문 비밀번호와 암호화된 비밀번호를 대조해보게 되는데, 암호를 복호화하여 대조하는 것이 아닌 bcrypt 모듈을 통해 대조한다.
   * 일치하지 않으면 실패를 반환한다.
   * 일치한다면 다음단계