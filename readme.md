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

### jsonwebtoken

[npm : jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)


```
npm install jsonwebtoken --save
```

## 로그인 회원가입 플로우

### 회원가입 (/register)

1. 클라이언트에서 유저의 이름, 이메일, 패스워드를 post 요청으로 받는다.
2. 패스워드를 bcrypt로 암호화 한다.
3. 유저의 이름, 이메일, 암호화된 패스워드를 user스키마에 저장한다.

### 로그인 (/login)

1. 클라이언트에서 유저의 이메일, 패스워드를 post 요청으로 받는다.
2. 이메일을 이용하여 데이터베이스 user스키마에서 일치하는 유저를 찾는다.
   * 일치하지 않으면 실패를 반환한다.
   * 일치한다면 다음단계
3. 비밀번호가 맞는 비밀번호 인지 확인한다. 이 부분에서 평문 비밀번호와 암호화된 비밀번호를 대조해보게 되는데, 암호를 복호화하여 대조하는 것이 아닌 bcrypt 모듈을 통해 대조한다.
   * 일치하지 않으면 실패를 반환한다.
   * 일치한다면 다음단계
4. 비밀번호가 일치하면 user스키마의 해당유저의 고유 아이디(user._id)를 토대로 jwt 토큰을 생성한다. 
5. 생성된 토큰을 쿠키나 로컬스토리지에 저장한다.

### 인증 : Authentication (/auth)

로그인이 필요한 페이지에 진입할 경우

1. 쿠키에 저장된 토큰을 고유 아이디(user._id)로 복호화한다.
2. 유저 아이디를 이용하여 데이터베이스 user스키마에서 일치하는 유저를 찾는다.
  * 유저가 있으면 true
  * 유저가 없으면 false
3. 고유 아이디가 일치하는 user row가 받아온 token을 가지고 있는지 확인한다.

### 로그아웃 (/logout)

1. auth 미들웨어에서 넣어준 _id 값으로 로그아웃 하려는 유저를 찾는다.
2. 해당 유저의 토큰을 삭제한다.

## client

### React

```
npx create-react-app .
```

#### Real DOM vs Virtual DOM

Virtual DOM은 리액트의 가장 큰 특징이다.

##### Real DOM

* 10개의 리스트가 있다.
* 그 중 한가지 리스트만 Update 됨
* 전체리스트를 다시 Reload 해야 함
* 매우 비싼 작업

##### Virtual DOM

* 10개의 리스트가 있다.
* 그 중 한가지 리스트만 Update 됨
* 그 중 한가지 리스트만 바꾸어 준다.

1. JSX로 렌더링한다.
2. Virtual DOM이 이전 Virtual DOM에서 찍어둔 Snapshot과 비교를 해서 바뀐 부분을 찾는다. 이 과정을 'diffing' 이라고 부름
3. 그 바뀐 부분만 Real DOM에서 바꾸어준다.

#### Props, State

### src/* 스카폴딩

```
src/
--/_actions
--/_reducers
--/components
--/views/
----/Footer
----/LandingPage
----/LoginPage
----/NavBar
----/RegisterPage
--/App.js
--/Config.js
--/hoc
--/utils
```

hoc : Higher Order Component의 약자로 nuxt/middleware랑 비슷한 역할

#### react-router-dom

```
npm i react-router-dom -S
```

#### Axios

```
npm i axios -S
```

#### http-proxy-middleware

```
npm i http-proxy-middleware -S
```

src/setupProxy.js

[Configuring the Proxy Manually](https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually)

``` javascript
// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

#### concurrently

```
npm i concurrently --S
```

``` json
// package.json
"scripts": {
    "backend": "nodemon ./server/index.js",
    "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""
  },
```

#### ant design

```
npm install antd --save
```

``` javascript
// index.js

import 'antd/dist/antd.css';
```

#### Redux 친구들

```
npm install redux react-redux redux-promise redux-thunk --save
```

##### redux-promise redux-thunk

Promise, Fuctions 을 dispatch() 하게 해줌