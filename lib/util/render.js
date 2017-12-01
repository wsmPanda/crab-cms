const Handlebars = require('handlebars')
const path = require('path')
const File = require('@util/file')

Handlebars.layouts = {}

function partials (viewPath, partialsPath) {
  let list = {}
  File.walkFile(partialsPath, 0, function (path) {
    if (path.match(/\.(hbs|handlebars)$/)) {
      var _path = path.replace(viewPath, '.').replace(path.match(/\.(hbs|handlebars)$/)[0], '')
      var _name = path.match(/([^\/]+)(?=\.)/ig)[0]
      list[_name] = _path
    }
  })
  return list
}

function compile (str) {
  return Handlebars.compile(str)
}

function render () {}

function viewsFile (s) {
  return path.join(__dirname, `../views/${s}.hbs`)
}
const helpers = {
  play: () => 'play',
  layout: function () {
    let args = Array.prototype.slice.call(arguments)
    let options = args.pop()
    let file = args[0]
    let body = options.fn(this)
    let data = this
    data.body = body
    return Handlebars.compile(readFile(viewsFile(file)).toString())(data)
  },
  layout_particle: function () {
    let args = Array.prototype.slice.call(arguments)
    let options = args.pop()
    let code = args[0]
    this[`particle_${code}`] = options.fn(this)
    return ''
  }
}

function getTplData (data) {
  var res = data
  while (res._parent) {
    if (!res) break
    if (res._theme_code) {
      break
    }
    res = res._parent
  }
  res && (res = res._template || res)
  return res
}
Handlebars.registerHelper(helpers)

module.exports = {
  helpers,
  partials,
  compile,
render}
