const Crab = require('@crab')
const router = require('koa-router')()
const Controller = require('../controller')
const Page = require('./page')
const fs = require('fs')


// 中间件,公共数据路由,渲染时将会把section作为模板参数，可在各项路由中添加其他数据
if (!Crab.disableStatic) {
  router.get('/:pageset', async(ctx, next) => {
    ctx.type = 'text/html';
    var path = `static/pages/${ctx.params.pageset}.html`
    if (fs.existsSync(path)) {
      ctx.body = fs.createReadStream(path)
    } else {
      await next()
    }
  })
}
router.use(Page)

// 指定页面路由
router.get('/article', Controller.article.list)
router.get('/article/:page', Controller.article.list)
router.all('/article/data/comments', Controller.article.comments)
router.all('/article/put/comments', Controller.article.commentsPut)

//表单提交处理
router.all('/submit/:code', Controller.form.put)


if (Crab.disableStatic) {
  router.get('/article/detail/:id', Controller.article.detail)
} else {
  router.get('/article/detail/:id', async(ctx, next) => {
    ctx.type = 'text/html';
    var path = `static/pages/article/${ctx.params.id}.html`
    if (fs.existsSync(path)) {
      ctx.body = fs.createReadStream(path)
    } else {
      await next()
    }
  })
}
router.get('/', ctx => {
  ctx.redirect('/index')
})
//动态页面导航路由
router.get('/:page', async(ctx, next) => {
  if (!Crab.disableStatic) {
    await ctx.render(`404`)
  } else {
    if (ctx.section.pages) {
      if (!ctx.section.active) {
        next()
      } else {
        await ctx.render(`page/${ctx.section.active}`)
      }
    } else {
      next()
    }
  }
})

module.exports = router.routes()
