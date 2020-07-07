// production 환경
if(process.env.NODE_ENV === 'production') {
  module.exports = require('./prod')
}

// development 환경
else {
  module.exports = require('./dev')
}