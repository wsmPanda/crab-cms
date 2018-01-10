const Crab = require('@crab')
const Page = Crab.model('page')

module.exports = async(ctx, next) => {
  //通过section对象改变页面tdk
  ctx.section = {
    title: 'CRAB',
    key: 'cms',
    description: 'crab cms',
    pages: []
  }
  var arr = ctx.path.split('/')
  var active = arr[1]
  var pages = await Page.list()
  var pagesMap = {}
  for (let page of pages) {
    pagesMap[page.id] = page
  }
  for (let page of pages) {
    if (pagesMap[page.parent]) {
      pagesMap[page.parent].children = pagesMap[page.parent].children || []
      pagesMap[page.parent].children.push(page)
    } else {
      ctx.section.pages.push(page)
    }
  }
  ctx.section._pages = pages
  if (active) {
    for (let page of pages) {
      if (page.code === active) {
        ctx.section.active = active
        break
      }
    }
  }
  await next()
}
