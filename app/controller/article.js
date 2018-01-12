const Crab = require('@crab')
const Article = Crab.model('article')
const Page = require('./page')
const Comment = Crab.model('comment')
const Time = require('@util/time')
const fs = require('fs')
const controller = {
  list: {
    template: 'articleList',
    async data(ctx) {
      var data = await Article.page({
        pageOn: ctx.params.page || 1,
        pageSize: 10
      })
      return data
    }
  },
  async staticize(row) {
    var section = await Page.data('article')
    if (row.tag_title) {
      section.title = row.tag_title
    }
    if (row.tag_key) {
      section.key = row.tag_key
    }
    if (row.tag_description) {
      section.description = row.tag_description
    }
    var data = {
      data: row,
      section
    }
    var html = await Crab.render('articleDetail', data).catch((res) => {
      return null
    })
    if (html) {
      fs.writeFileSync(`static/pages/article/${row.href || row.id}.html`, html)
    }
  },
  async detailData(id, section = {}) {
    var data = await Article.find(id)
    if (!data) {
      data = await Article.find({
        href: id
      })
    }
    if (data.tag_title) {
      section.title = data.tag_title
    }
    if (data.tag_key) {
      section.key = data.tag_key
    }
    if (data.tag_description) {
      section.description = data.tag_description
    }
    return data
  },
  detail: {
    template: 'articleDetail',
    async data(ctx) {
      var data = await Article.find(ctx.params.id)
      if (!data) {
        data = await Article.find({
          href: ctx.params.id
        })
      }
      if (data.tag_title) {
        ctx.section.title = data.tag_title
      }
      if (data.tag_key) {
        ctx.section.key = data.tag_key
      }
      if (data.tag_description) {
        ctx.section.description = data.tag_description
      }
      return data
    }
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
  }
}
module.exports = controller
