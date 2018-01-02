const Crab = require('@crab')
const Page = Crab.model('page')

module.exports = async(ctx, next) => {
  var data = {
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
      data.pages.push(page)
    }
  }
  data._pages = pages
  ctx.section = data
  if (active) {
    for (let page of pages) {
      if (page.code === active) {
        data.active = active
        break
      }
    }
  }
  await next()
}
