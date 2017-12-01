const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const md5 = require('@util/md5')

const staticRouter = require('./static')
const Crab = require('@crab')
var adminRouter = new Router()
var router = new Router()


router.all('/', async(ctx, next) => {
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
  console.log(ctx.session)
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

//通用数据操作接口
router.all('/service/data/:code/list', async(ctx, next) => {
  console.log(1)
  var res = {}
  var code = ctx.params.code
  if (Crab.model(code)) {
    res.data = await Crab.model(code).list(ctx.body)
  }
  ctx.body = res
})

router.all('/service/data/:code/save', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  if (Crab.model(code)) {
    res.data = await Crab.model(code).save(ctx.body)
  }
  ctx.body = res

})

router.all('/service/data/:code/delete', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  if (Crab.model(code)) {
    res.data = await Crab.model(code).delete(ctx.body)
  }
  ctx.body = res

})

router.all('/service/data/:code/find/:id', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  var id = ctx.params.id
  if (Crab.model(code)) {
    res.data = await Crab.model(code).find(id)
  }
  ctx.body = res
})

adminRouter.use('/admin', router.routes(), router.allowedMethods())
adminRouter.use('/admin/static', staticRouter.routes(), staticRouter.allowedMethods())
module.exports = adminRouter.routes()
