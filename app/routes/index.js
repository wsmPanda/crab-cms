const router = require('koa-router')()
const Controller = require('../controller')
const Section = require('./section')
const Page = require('./page')

// 中间件,公共数据路由,渲染时将会把section作为模板参数，可在各项路由中添加其他数据
router.use(Section)
router.use(Page)

// 指定页面路由
router.get('/article', Controller.article.list)
router.get('/article/:page', Controller.article.list)
router.all('/article/data/comments', Controller.article.comments)
router.all('/article/put/comments', Controller.article.commentsPut)
router.get('/article/detail/:id', Controller.article.detail)
router.get('/', ctx => {
  ctx.redirect('/index')
})
// 通用页面路由
router.get('/:page', async(ctx, next) => {
  if (ctx.section.pages) {
    if (!ctx.section.active) {
      next()
    } else {
      await ctx.render(`page/${ctx.section.active}`)
    }
  } else {
    next()
  }
})

module.exports = router.routes()
