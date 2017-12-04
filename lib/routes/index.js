const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const md5 = require('@util/md5')

const staticRouter = require('./static')
const serviceRouter = require('./service')

const Crab = require('@crab')
var adminRouter = new Router()
var router = new Router()


router.all('/', async(ctx, next) => {
  ctx.session.login = true
  if (ctx.session && ctx.session.login) {
    await next()
  } else {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('admin/dist/login.html');
  }
})

//后台登录验证
router.all('/service/signin', async(ctx, next) => {
  var User = Crab.model('user')
  var data = await User.find({
    account: ctx.query.name
  })
  var check = data && data.password === md5(ctx.query.password, data.salt)
  if (check) {
    ctx.session.login = true
    ctx.body = {
      status: 1
    }
  } else {
    ctx.session.login = false
    ctx.body = {
      status: 0
    }
  }
})

//后台登录验证
router.all('/*', async(ctx, next) => {
  if (ctx.path.startsWith('/admin/static/')) {
    await next()
  } else {
    if (ctx.session && ctx.session.login) {
      await next()
    } else {
      await ctx.redirect('/admin/');
    }
  }
})

adminRouter.use('/admin', router.routes(), router.allowedMethods())
adminRouter.use('/admin/static', staticRouter.routes(), staticRouter.allowedMethods())
adminRouter.use('/admin/service', serviceRouter.routes(), serviceRouter.allowedMethods())

module.exports = adminRouter.routes()
