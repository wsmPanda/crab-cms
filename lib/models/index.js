const DB = require('../db')
const path = require('path')
const DataModel = require('./model')
const importer = require('@util/importer')
const AppModels = importer(path.join(__dirname, '../../app/models'))('./')
// 扫描并检查数据模型，进行初始化
for (let i in AppModels) {
  let model = AppModels[i]
  DB.registerModel(model)
}
module.exports = function (code) {
  return new DataModel(code)
}
