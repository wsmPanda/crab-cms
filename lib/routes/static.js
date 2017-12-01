//静态自由路由
const Router = require('koa-router')
const koaStatic = require('koa-static')
const path = require('path')

var staticServer = koaStatic(path.join(__dirname + '/../../admin/dist/static'))
var router = new Router()
router.get('*', async(ctx, next) => {
    /**
     * 采用路由+返回静态中间件的方法设置后台静态文件目录
     * koa-static 采用 send 使用ctx.path判断请求文件相对路径
     * 由于ctx.path是全量链接需要排除掉路由前缀方能获取正常文件位置
     * ##临时方案 待扩展 koa-static
     */
    ctx.path = ctx.path.replace(new RegExp('^' + ctx._matchedRoute), '')
    await staticServer(ctx, next)
})
module.exports = router