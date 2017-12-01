const Crab = require('@crab')
const Article = Crab.model('article')
module.exports = {
    async list(ctx) {
        var data = await Article.list()
        await ctx.render('articleList', {
            data
        })
    },
    async detail(ctx) {
        var data = await Article.find(ctx.params.id)
        await ctx.render('articleDetail', {
            data
        })
    }
}