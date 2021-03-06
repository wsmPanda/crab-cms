const Router = require('koa-router')
const Crab = require('@crab')
var router = new Router()
var muilter = require('@util/multer')
var upload = muilter.single('file')


router.all('/upload', upload, async(ctx, next) => {
  ctx.body = {
    ...ctx.req.file
  }
})


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
    res.data = await Crab.model(code).page(ctx.request.body)
    res.status = 1
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
  var Model = Crab.model(code)
  if (Model) {
    res.data = await Model.find(id)
  }
  ctx.body = res
})

const Controller = require('@app/controller')

router.all('/staticize/:code', async(ctx, next) => {
  var res = {}
  var code = ctx.params.code
  var Model = Crab.model(code)
  if (Model && Controller[code] && Controller[code]) {
    var list = await Model.list()
    for (let i in list) {
      res = await Controller[code].staticize(list[i])
    }
  }
  ctx.body = res

})

module.exports = router
