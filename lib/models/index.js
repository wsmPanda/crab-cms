const DB = require('../db')
const path = require('path')
const DataModel = require('./model')
const importer = require('@util/importer')
const AppModels = importer(path.join(__dirname, '../../app/models'))('./')
for (let i in AppModels) {
  let model = AppModels[i]
  DB.checkModel(model)
}
module.exports = function (code) {
  return new DataModel(code)
}
