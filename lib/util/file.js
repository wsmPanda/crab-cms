const fs = require('fs')
// 文件同步遍历·
const walkFile = (path, floor, handleFile) => {
  handleFile(path, floor)
  floor++
  let files = fs.readdirSync(path)
  files.forEach(function (item) {
    let tmpPath = path + '/' + item
    let stats = fs.statSync(tmpPath)
    if (stats.isDirectory()) {
      walkFile(tmpPath, floor, handleFile)
    } else {
      handleFile(tmpPath, floor)
    }
  })
}
// 扫描文件夹
const scanDirectory = (path) => {
  path = process.cwd() + path
  let files = fs.readdirSync(path)
  var list = {}
  files.forEach(function (item) {
    let tmpPath = path + '/' + item
    let stats = fs.statSync(tmpPath)
    if (stats.isDirectory()) {
      list[item] = tmpPath
    }
  })
  return list
}
// 扫描文件
const scanFile = (path, suffix) => {
  path = process.cwd() + path
  let files = fs.readdirSync(path)
  let pattern = null
  suffix && (pattern = new RegExp('\\.(' + suffix + ')$', 'igm'))
  let list = {}
  files.forEach(function (item) {
    let tmpPath = path + '/' + item
    let stats = fs.statSync(tmpPath)
    if (!stats.isDirectory()) {
      if (suffix && !item.match(pattern)) return
      list[item] = tmpPath
    }
  })
  return list
}
// 文件同步读取
const readFile = (path) => {
  return fs.readFileSync(path).toString()
}

const readJson = (path, comp) => {
  var str = comp ? fs.readFileSync(path).toString() : fs.readFileSync(process.cwd() + path).toString()
  // 去除注释
  str = str.replace(/\:\/\//g, '\:\\/\\/')
  str = str.replace(/\/\/[\s\S]*?\n/g, '')
  str = str.replace(/\/\/[\s\S]*?$/g, '')
  var res = false
  try {
    res = JSON.parse(str)
  } catch (ex1) {
    try {
      // res = eval(`res=${str}`)
      res = eval(`${str}`)
    } catch (ex2) {
      console.log(`json文件'${path}'解析错误`, ex1, ex2)
    }
  }
  return res
}
const writeJson = (path, data, comp) => {
  var str = comp ? path : process.cwd() + path
  try {
    fs.writeFileSync(str, JSON.stringify(data))
  } catch (ex) {
    console.log('json写入错误', ex)
  }
}

module.exports = {
walkFile,scanDirectory,scanFile,readFile,readJson,writeJson}
