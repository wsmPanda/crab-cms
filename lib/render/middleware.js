const views = require('../middleware/view')
const path = require('path')
const Render = require('./index')
module.exports = views(Render.viewsPath, Render.options)
