const router = require('koa-router')()
const Controller = require('../controller')
router.get('/article', Controller.article.list)
router.get('/article/:page', Controller.article.list)
router.get('/article/detail/:id', Controller.article.detail)
router.get('/', ctx => {
  ctx.redirect('/article/')
})
module.exports = router.routes()
