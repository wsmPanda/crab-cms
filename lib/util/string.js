var exp = {
  // 提取参数,支持${code},与{code}写法
  param: new RegExp('\\$?\\{(.| )+?\\}', 'igm'),
  paramCode: new RegExp(/[(\\${),\{,\}]/img),
  // 提取表达式中的字符串
  string: new RegExp(/"(.*?)"|'(.*?)'/img),
  // 匹配变量名（字母或下划线开头的单词）
  variate: new RegExp(/[a-zA-Z_](\w)*?\b/img)
}

module.exports = {
  composeParams(str, info, empty = true) {
    info = info ? JSON.parse(JSON.stringify(info)) : {}
    if (str && str.match && info) {
      var arr = str.match(exp.param)
      if (arr && arr.length) {
        arr.forEach((item) => {
          // 正则替换取出货括号中的编码
          var code = item.replace(exp.paramCode, '')
          // 清除未找到的编码
          var arr = code.split('.')
          var temp = info
          if (arr) {
            for (let i in arr) {
              if (temp[arr[i]] !== undefined) {
                temp = temp[arr[i]]
              } else {
                temp = empty ? '' : 0
                break
              }
            }
          }
          str = str.replace(item, temp)
        })
      }
    }
    return str
  }
}
