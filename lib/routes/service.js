const Router = require('koa-router')
const Crab = require('@crab')
var router = new Router()
router.all('/model/:code', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  if (Crab.model(code)) {
    res.data = await Crab.model(code).jsonModel(code)
  }
  ctx.body = res
})

//通用数据操作接口
router.all('/data/:code/list', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  if (Crab.model(code)) {
    res.data = await Crab.model(code).list(ctx.body)
  }  
  ctx.body = res
})

router.all('/data/:code/save', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  if (Crab.model(code)) {
    res.data = await Crab.model(code).save(ctx.request.body)
  }
  ctx.body = res

})

router.all('/data/:code/delete', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  if (Crab.model(code)) {
    res.data = await Crab.model(code).delete(ctx.request.body)
  }
  ctx.body = res

})

router.all('/data/:code/find/:id', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  var id = ctx.params.id
  if (Crab.model(code)) {
    res.data = await Crab.model(code).find(id)
  }
  ctx.body = res
})

module.exports = router