'use strict'

const {resolve} = require('path')
const debug = require('debug')('koa-views')
const consolidate = require('consolidate')
const send = require('koa-send')
const getPaths = require('get-paths')
const pretty = require('pretty')

module.exports = viewsMiddleware

function viewsMiddleware (
  path, { engineSource = consolidate, extension = 'html', options = {}, map} = {}
) {
  return function views (ctx, next) {
    if (ctx.render) return next()
    var splitReg = new RegExp(/[\\\/]/)
    ctx.render = function (relPath, locals = {}) {
      return getPaths(path, relPath, extension).then(paths => {
        const suffix = paths.ext
        // 设置公共渲染参数
        if (ctx.section) {
          locals.section = ctx.section
        }

        const state = Object.assign(locals, options, ctx.state || {})
        state.partials = Object.assign({}, options.partials || {})
        // deep copy partials
        // 通过判断模板所在位置为partials添加路径前缀
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
        debug('render `%s` with %j', paths.rel, state)
        ctx.type = 'text/html'

        if (isHtml(suffix) && !map) {
          return send(ctx, paths.rel, {
            root: path
          })
        } else {
          const engineName = map && map[suffix] ? map[suffix] : suffix
          const render = engineSource[engineName]
          if (!engineName || !render)
            return Promise.reject(
              new Error(`Engine not found for the ".${suffix}" file extension`)
          )
          return render(resolve(path, paths.rel), state).then(html => {
            if (locals.pretty) {
              debug('using `pretty` package to beautify HTML')
              html = pretty(html)
            }
            ctx.body = html
          })
        }
      })
    }

    return next()
  }
}

function isHtml (ext) {
  return ext === 'html'
}
