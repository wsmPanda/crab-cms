const Crab = require('@crab')
const Article = Crab.model('article')
const Comment = Crab.model('comment')
const Time = require('@util/time')
module.exports = {
  async list(ctx) {
    var data = await Article.page({
      pageOn: ctx.params.page || 1,
      pageSize: 10
    })
    await ctx.render('articleList', {
      data
    })
  },
  async comments(ctx) {
    var data = await Comment.page({
      filter: {
        article_id: ctx.request.body.id
      },
      order: ['-create_time'],
      pageOn: ctx.request.body.page || 1,
      pageSize: 10
    })
    ctx.body = data
  },
  async commentsPut(ctx) {
    await Comment.save({ ...ctx.request.body,
      create_time: Time.toTime(Date.parse(new Date()))
    })
    ctx.body = {
      status: 1
    }
  },
  async detail(ctx) {
    var data = await Article.find(ctx.params.id)
    await ctx.render('articleDetail', {
      data
    })
  }
}
