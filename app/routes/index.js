const router = require('koa-router')()
const Controller = require('../controller')

router.get('/article', Controller.article.list)
router.get('/article/:id', Controller.article.detail)
router.get('/', ctx => {
  ctx.redirect('/article/')
})
module.exports = router.routes()
