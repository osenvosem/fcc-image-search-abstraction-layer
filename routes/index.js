const compose = require('koa-compose')
const home = require('./home')
const search = require('./search')

module.exports = compose([
  home.routes(),
  home.allowedMethods(),
  search.routes(),
  search.allowedMethods()
])