const Handlebars = require('handlebars')
const consolidate = require('consolidate')
const path = require('path')
const File = require('@util/file')
const viewsPath = path.join(__dirname, '../../app/views')
const helpers = require('./helper')

const options = {
  map: {
    hbs: 'handlebars'
  },
  extension: 'hbs',
  options: {
    helpers: helpers,
    partials: partials(viewsPath, viewsPath + '/partials/')
  }
}

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

var splitReg = new RegExp(/[\\\/]/)
function render (relPath, locals = {}) {
  const state = Object.assign(locals, options.options)
  state.partials = Object.assign({}, options.options.partials || {})
  if (splitReg.test(relPath)) {
    state.partials = state.partials || {}
    let suf = ''
    let arr = relPath.split(splitReg)
    for (let i = 0; i < arr.length - 1; i++) {
      suf += '../'
    }
    for (let i in state.partials) {
      state.partials[i] = suf + state.partials[i]
    }
  }
  return consolidate.handlebars(path.resolve(viewsPath, relPath + '.hbs'), state)
}

function compile (str) {
  return Handlebars.compile(str)
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
  render,
  viewsPath,
options}
