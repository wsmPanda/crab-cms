/**
 * 字符串处理工具方法
 */

var exp = {
  // 提取参数,支持${code},与{code}写法
  param: new RegExp('\\$?\\{(.| )+?\\}', 'igm'),
  paramCode: new RegExp(/[(\\${),\{,\}]/img),
  // 提取表达式中的字符串
  string: new RegExp(/"(.*?)"|'(.*?)'/img),
  // 匹配变量名（字母或下划线开头的单词）
  variate: new RegExp(/[a-zA-Z_](\w)*?\b/img)
}
export default {
  regExp: exp,
  // 编译组合路径 
  composePath(str, info) {
    info = info ? JSON.parse(JSON.stringify(info)) : {}
    if (str && info) {
      var arr = str.match(exp.param)
      if (arr && arr.length) {
        arr.forEach((item) => {
          // 正则替换取出货括号中的编码
          var code = item.replace(exp.paramCode, '')
          if (info && info[code]) {
            str = str.replace(item, info[code])
          }
        })
      }
    }
    return str
  },
  // 提出表达式中所有包含的参数对象
  valueParam(str) {
    var hash = {}
    if (str) {
      var arr = str.match(exp.param)
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          let code = arr[i].replace(exp.paramCode, '')
          hash[code] = true
        }
      }
    }
    return hash
  },
  // 将字符串中的模板变量${code}改为 code
  trimParam(str) {
    if (str && (typeof str === 'string')) {
      return str.replace(exp.param, (s) => {
        return s.replace(exp.paramCode, '').replace(/^\s+|\s+$/gm, '')
      })
    } else {
      return str
    }
  },
  // 取得参数括号中的值
  getParamCode(str) {
    if (str && (typeof str === 'string')) {
      return str.replace(exp.paramCode, '').replace(/^\s+|\s+$/gm, '')
    }
  },
  // 编译组合带参数的数值
  composeValue(str, info, empty = true) {
    info = info ? JSON.parse(JSON.stringify(info)) : {}
    info.app = info.app || window.App
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
  },
  // 字符串c为s的末尾
  lastMatch(s, c) {
    if (s && c) {
      var rs = s.split('').reverse().join('')
      var rc = c.split('').reverse().join('')
      return rs.indexOf(rc) === 0
    } else {
      return false
    }
  },
  composeUrl(str, info, query) {
    info = info || {}
    var pattern = new RegExp('\\{(.| )+?\\}', 'igm')
    if (str && info) {
      var arr = str.match(pattern)
      if (arr && arr.length) {
        for (let i = 0; i < arr.length; i++) {
          var code = arr[i].substring(1, arr[i].length - 1)
          if (info && info[code]) {
            str = str.replace(arr[i], info[code])
          }
        }
      }
    }
    if (query) str = this.setUrlQuery(str, query)
    return str
  },
  // 设置参数查询
  setUrlQuery(url, query) {
    if (!query) return url
    var addon = ''
    for (let i in query) {
      addon += `${i}=${query[i]}&`
    }
    if (!addon.length) return url
    if (url.indexOf('?') < 0) {
      url += '?'
    } else if (url[url.length - 1] !== '&') {
      url += '&'
    }
    url += addon
    return url.slice(0, -1)
  },
  trim(str) {
    return typeof str === 'string' && str.replace(/^\s+|\s+$/gm, '')
  }
}
