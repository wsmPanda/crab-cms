const Handlebars = require('handlebars')
const $ = require('@util')
const Time = require('@util/time')
const path = require('path')

function viewsFile(s) {
  return path.join(__dirname, `../views/${s}.hbs`)
}

module.exports = {
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
  has: function (v1, v2, opts) {
    return v1 ? v2 : '';
  },
  format_time: function (v) {
    return Time.toTime(v)
  }
}
