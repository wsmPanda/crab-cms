/**遍历获取文件夹文件
 * 参数需为绝对路径，包含目录文件的index文件可用参数 __dirname
 * 返回文件条用方法，参数为下级目录名称，可通过参数 ./ 直接获取当前文件参数
 *  该方法返回值为引用文件对象，键值为文件名
 */
const path = require('path')
const fs = require('fs')
 
function dispatchImporter (rel__dirname) {
  return (from) => {
    var imported = {}
    var joinPath = function () {
      return '.' + path.sep + path.join.apply(path, arguments)
    }
    var fsPath = joinPath(path.relative(process.cwd(), rel__dirname), from)
    fs.readdirSync(fsPath).forEach(function (name) {
      var info = fs.statSync(path.join(fsPath, name))
      if (info.isDirectory()) {
        imported[name] = importer(joinPath(from, name))
      } else {
        // 只引入能够 require 的问阿金
        var ext = path.extname(name)
        var base = path.basename(name, ext)
        if (require.extensions[ext]) {
          imported[base] = require(path.join(rel__dirname, from, name))
        } else {
          console.error('file cannot import', ext)
        }
      }
    })
    return imported
  }
}
module.exports = dispatchImporter
