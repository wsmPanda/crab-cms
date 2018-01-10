const Koa = require('koa')
const app = new Koa()
const config = require('../config/index')
const render = require('./render')
const logger = require('koa-logger')
const lib_routes = require('../lib/routes')
const app_routes = require('../app/routes')
const crab_logger = require('../lib/logger')
const koaBody = require('koa-body')
const session = require('koa-session')

const koaStatic = require('koa-static')
app.keys = ['crabfnvsduihf84390qythuiasfg893qo4h80hrfesa']
 
// 加载表态文件
app.use(session({
  maxAge: 36000000
}, app))
app.use(logger())
app.use(crab_logger)
// 引用后端渲染器（只作用于显示前台界面的使用，后台采用spa模式）
app.use(render)
app.use(koaBody())
app.use(lib_routes)
app.use(app_routes)

// 设置静态文件目录 
app.use(koaStatic(__dirname + '/../static'))

// 报错
app.on('error', (err, ctx) => {
  console.error('server error')
  console.error(err)
})
app.listen(config.port)
