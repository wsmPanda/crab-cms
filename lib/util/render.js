const Handlebars = require('handlebars')
const path = require('path')
const File = require('@util/file')
const $ = require('@util')
const Time = require('@util/time')
Handlebars.layouts = {}

function partials(viewPath, partialsPath) {
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

function compile(str) {
  return Handlebars.compile(str)
}

function render() {}

function viewsFile(s) {
  return path.join(__dirname, `../views/${s}.hbs`)
}
const helpers = {
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
  },
  for: function () {
    let args = Array.prototype.slice.call(arguments)
    let options = args.pop()
    let count = args[0]
    let ret = ``
    for (var i = 0; i < count; i++) {
      ret = ret + options.fn({
        ...options.hash,
        i: i + 1
      })
    }
    return ret
  },
  // 返回替换参数
  paramPath: function () {
    let args = Array.prototype.slice.call(arguments)
    let options = args.pop()
    let path = args[0]
    return $.composeParams(path, options.hash)
  },
  equal: function (v1, v2, opts) {
    if (v1 == v2) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
  or: function (v1, v2, opts) {
    return v1 || v2
  },
  format_time: function (v) {
    return Time.toTime(v)
  }
}

function getTplData(data) {
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
  render
}
