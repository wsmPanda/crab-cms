const views = require('../lib/middleware/view')
const path = require('path')
const Render = require('@util/render')
var viewsPath = path.join(__dirname, '../app/views')
module.exports = views(viewsPath, {
  map: {
    hbs: 'handlebars'
  },
  extension: 'hbs',
  options: {
    helpers: Render.helpers,
    partials: Render.partials(viewsPath, viewsPath + '/partials/')
  }
})
