const Crab = require('@crab')
const Page = Crab.model('page')
const fs = require('fs')
const controller = {
  async data(code) {
    var section = await controller.section(code)
    section.content = await controller.content(section.page)
    return section
  },
  async staticize(row) {
    var data = {}
    data.section = await controller.data(row.code)
    var html = await Crab.render('page/' + row.code, data).catch((res) => {
      return null
    })
    if (html) {
      fs.writeFileSync(`static/pages/${row.code}.html`, html)
    }
  },
  async content(page) {
    var content
    if (page && page.relate_type) {
      var Model = Crab.model(page.relate_type)
      if (Model) {
        if (!page.relate_code && page.relate_code !== 0) {
          content = await Model.list()
        } else {
          content = await Model.find({
            code: page.relate_code
          })
        }
      }
    }
    return content
  },
  async section(active) {
    var section = {
      title: 'CRAB',
      key: 'cms',
      description: 'crab cms',
      pages: []
    }
    var pages
    if (!controller.catchData) {
      pages = await Page.list()
      controller.catchData = pages
    } else {
      pages = controller.catchData
    }
    var pagesMap = {}
    for (let page of pages) {
      pagesMap[page.id] = page
      page.children = []
    }
    for (let page of pages) {
      if (pagesMap[page.parent]) {
        pagesMap[page.parent].children = pagesMap[page.parent].children || []
        pagesMap[page.parent].children.push(page)
      } else {
        section.pages.push(page)
      }
    }
    section._pages = pages
    if (active) {
      for (let page of pages) {
        if (page.code === active) {
          section.active = active
          section.page = page
          if (page.custom) {
            try {
              section.custom = JSON.parse(page.custom)
            } catch (ex) {
              console.warn(ex)
            }
          }
          break
        }
      }
    }
    return section
  },
  catchData: null
}

module.exports = controller
