/**
 * 文件目录路径别名
 * 在入口中引用
 * 通过覆盖requre，检测路径变量进行替换完成
 */
// 别名映射参数
const alias = {
  'crab': 'lib',
  'util': 'lib/util',
  'app': 'app'
}
const _module = require('module')
const path = require('path')
var rootPath = path.normalize(`${__dirname}/../..`)
var list = {}
for (let code in alias) {
  list[code] = path.join(rootPath, alias[code])
}
console.log(rootPath)
const _require = _module.prototype.require
_module.prototype.require = function (dir) {
  if (dir.indexOf('@') === 0) {
    for (let code in list) {
      dir = dir.replace(`@${code}`, list[code])
    }
  }
  return _require.call(this, dir)
}
