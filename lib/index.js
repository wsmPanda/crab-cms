/**
 * 应用对象
 * 
 */
require('./util/alias')
const Render = require('./render')
var colors = require('colors')
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'red',
  info: 'green',
  data: 'blue',
  help: 'cyan',
  warn: 'yellow',
  debug: 'magenta',
  error: 'red'
})
const config = require('../config/index')

const model = require('./models')
var Crab = function () {
  this.config = config
  return this
}
Crab.prototype.model = model
Crab.prototype.render = Render.render
var crab = new Crab()
crab.disableStatic = true
module.exports = crab
