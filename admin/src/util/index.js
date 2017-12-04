import _string from './string'
import _user from './user'
import {
  link,
  upload,
  download,
  submitForm,
  fetchModel,
  linkPath
} from './link/index'
export * from './link/index'
//用于遍历相同结构的嵌套元素，并对其进行处理
//将方法分离分两段，使遍历子节点时无需进行根节点的判断逻辑
export function eachChild({
  data, //当前处理元素
  handler, //节点处理元素，自父节点向子节点执行
  after, //后处理方法，自子节点向父节点执行
  key = 'children'
}) {
  var set = new Set()
  var deep = 0
  //对于本身为数组的根数据进行处理
  set.add(data)
  if (isArray(data)) {
    deep = -1
    data = {
      [key]: data
    }
  } else {
    if (handler) {
      handler(data, deep)
    }
  }
  if (data[key] && data[key].length) {
    for (let i = 0; i < data[key].length; i++) {
      var child = data[key][i]
      forEachChild({
        data: child,
        handler,
        set,
        key,
        after,
        deep: deep + 1
      })
    }
  }
}

export function forEachChild({
  data, //当前处理元素
  handler, //节点处理元素
  after,
  set, //用于递归，正常使用无需设置 已处理对象的集合，用于排除循环引用
  key,
  parent,
  deep
}) {
  if (!set.has(data)) {
    if (handler) {
      handler(data, deep, parent)
    }
    set.add(data)
    if (data[key] && isArray(data[key])) {
      data[key].forEach((child) => {
        forEachChild({
          data: child,
          handler,
          set,
          after,
          key,
          parent: data,
          deep: deep + 1
        })
      })
    }
    if (after) {
      after(data, deep, parent)
    }
  }
}

//为数据对象设置序数属性默认为serial
export function setSerial(data, key = 'serial') {
  data && data.forEach((item, index) => {
    item[key] = index + 1
  })
  return data
}

export function local(code, data) {
  if (data !== undefined) {
    window.localStorage[code] = JSON.stringify(data)
  } else {
    try {
      return JSON.parse(window.localStorage[code])
    } catch (e) {
      return window.localStorage[code]
    }
  }
}

// 在数组/对象中寻找code值为为value的对象
export function find(o, code, value) {
  for (let i in o) {
    if (o[i][code] === value) {
      return o[i]
    }
  }
}

export function copyJson(o) {
  if (!o) return o
  try {
    return JSON.parse(JSON.stringify(o))
  } catch (ex) {
    return o
  }
}
const MOZ_HACK_REGEXP = /^moz([A-Z])/

function camelCase(name) {
  return name.replace(/([:\-_]+(.))/g, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}
// getStyle
export function getStyle(element, styleName) {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

/**
 * 返回对象的键组成的数组
 */
export function listMap(o) {
  var list = []
  for (let i in o) {
    list.push(i)
  }
  return list
}
/*根据属性名生成映射关系对象*/
export function propMap(l, code) {
  if (!has(code)) return l
  var o = {}
  for (let i in l) {
    o[l[i][code]] = l[i]
  }
  return o
}

export function has(obj, val) {
  if (typeof val !== 'undefined') {
    if (typeof obj === 'undefined') {
      return val
    } else {
      return obj
    }
  } else {
    if (typeof obj === 'undefined') {
      return false
    } else {
      return true
    }
  }
}
// 设置对象默认值
// obj为操作对象，val为默认对象,不覆盖已有属性
export function setObj(obj, val) {
  obj = obj || {}
  for (let i in val) {
    if (typeof obj[i] === 'object') {
      obj[i] = setObj(obj[i], val[i])
    } else {
      obj[i] = has(obj[i], val[i])
    }
  }
  return obj
}
export function setProp(obj, val) {
  for (let i in val) {
    obj[i] = val[i]
  }
  return obj
}

export function copyProp(obs, obv, list) {
  list.forEach((i) => {
    obs[i] = obv[i]
  })
  return obs
}

export function isArray(object) {
  return object && typeof object === 'object' &&
    Array === object.constructor
}

export function pushArr(arr, val) {
  arr = arr || []
  for (let i = 0; i < val.length; i++) {
    arr.push(val[i])
  }
  return arr
}

export function trimSpace(exp) {
  return exp.replace(/\s/g, '')
}

// 精华提交数据，剔除提交数据中的临时变量
export function purifyData(data) {
  var nData = {}
  for (let i in data) {
    if (i.indexOf('_') !== 0) {
      if (typeof data[i] === 'object') {
        nData[i] = purifyData(data[i])
      } else {
        nData[i] = data[i]
      }
    }
  }
  return nData
}

export function getNodeCode(str) {
  var code
  if (str) {
    var arr = str.split('_')
    if (arr[0] === 'pf') {
      code = arr.slice(1, arr.length).join('_')
    } else {
      code = arr.join('_')
    }
  }
  return code
}

// 转化为camelCase 驼峰命名,s分隔符
export function toCamelCase(str, s = '-') {
  var reg = new RegExp(s + '[a-z]', 'g')
  return str && str.replace(reg, x => x.slice(1).toUpperCase())
}

// 转化为kebab-case 短横线隔开式
export function toKebabCase(str) {
  return str && str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 转化为下划线分割
export function toUnderCase(str) {
  return str && str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export function upperCase(str) { // 正则法
  str = str.toLowerCase();
  var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
  return str.replace(reg, function (m) {
    return m.toUpperCase()
  });
}

//动态移入script标签，参数脚本路径或者标签的指定属性对象
export function requireScript(setting) {
  if (typeof setting === 'string') {
    setting = {
      src: setting
    }
  }
  setting = setObj(setting, {
    type: 'text/javascript',
    async: true
  })
  var tag = document.createElement('script')
  setProp(tag, setting)
  return new Promise((resolve) => {
    tag.onload = function () {
      resolve()
    }
    document.body.appendChild(tag)
  })
}

//将多个字符串等式转化为对象，主要用于model解析 如ref.param.mapping,默认针对形式 k1=v1;k2=v2，可指定等于符号与分割符号
export function parseStringEq(str, eq = '=', split = ';') {
  var res = {}
  if (str && str.split) {
    var arr = str.split(split)
    if (arr && arr.length) {
      arr.forEach((item) => {
        var a = item.split(eq)
        if (a && a.length >= 2) {
          res[_string.trim(a[0])] = _string.trim(a[1])
        }
      })
    }
  }
  return res
}
var dev = false
var envMeta = document.querySelector('meta[name=ENV]')
if (envMeta) {
  window.ENV = envMeta.attributes.content.value
  if (window.ENV === 'dev') {
    dev = true
  }
} else {
  window.ENV = 'prod'
}
//两个参数：通过option中的name寻找祖先元素
//三个参数：找到属性code为 
export function getParent(v, code, value) {
  if (v) {
    var node = v
    while (node && node.$parent) {
      node = node.$parent
      if (value === undefined) {
        if (node.$options.name === code) {
          return node
        }
      } else {
        if (node[code] === value) {
          return node
        }
      }
    }
  }
}

//通过属性名路径获得对应值，可传入形如 name/code/value 的路径字符串或者 [name.value,code] 的字符串数组
//可用于从根节点获得store的状态值
export function getPathValue(data, path, sign = '/') {
  //数据预处理，转化为标准的路径数组
  var res = data
  if (!path || !data) return null
  if (!isArray(path)) {
    if (path.split && path.indexOf(sign) >= 0) {
      path = path.split(sign)
    } else {
      return null
    }
  }
  //循环获取数据属性值
  for (let i = 0; i < path.length; i++) {
    if (res && res[path[i]]) {
      res = res[path[i]]
    } else {
      res = null
      break
    }
  }
  return res
}

export function fileFormat(name) {
  if (!name && !name.length) return
  var arr = name.split('.')
  return _string.trim(arr[arr.length - 1])
}

export function valueNull(v) {
  return v === '' || v === null || v === undefined || Number.isNaN(v)
}


//通过设置添加隐藏节点来获取在指定元素字符的宽度,使用样式计算属性来获取节点字号
var shadowNode
export function getFontWidth(text, el) {
  if (!el) {
    el = document.body
  }
  if (!shadowNode) {
    shadowNode = document.createElement("div");
    shadowNode.className = 'hidden-line'
  }
  if (!shadowNode.parentNode) {
    document.body.appendChild(shadowNode)
  }
  shadowNode.style.fontSize = window.getComputedStyle(el).fontSize
  shadowNode.innerHTML = text
  return window.getComputedStyle(shadowNode).width
}



export function modelDefultData(model, param = {}) {
  var data = copyJson(model.data || {});
  model.fields.forEach(field => {
    if (field.def_value !== undefined) {
      data[field.code] = field.def_value;
    }
  });
  for (let i in data) {
    data[i] = _string.composeValue(data[i], param);
    if (_string.trim(data[i]) === "now()") {
      data[i] = Date.parse(new Date());
    }
  }
  return data
}

//根据名称获得meta数据
export function metaContent(code) {
  var metaNode = document.querySelector('meta[name=' + code + ']')
  if (metaNode) {
    return metaNode.attributes.content.value
  } else {
    return null
  }
}
export function localPageSize(code, size) {
  if (!local('localPageSize')) {
    local('localPageSize', {})
  }
  var data = local('localPageSize')
  if (size) {
    data[code] = size
    local('localPageSize', data)
  }
  return data[code]
}
window.App = metaContent('APP_CODE') || 'cs'

export default {
  submitForm,
  fetchModel,
  linkPath,
  download,
  getFontWidth,
  localPageSize,
  upperCase,
  fileFormat,
  modelDefultData,
  valueNull,
  metaContent,
  getParent,
  eachChild,
  getPathValue,
  toCamelCase,
  toKebabCase,
  toUnderCase,
  getNodeCode,
  local,
  copyJson,
  copy: copyJson,
  trimSpace,
  parseStringEq,
  pushArr,
  isArray,
  copyProp,
  setProp,
  setObj,
  has,
  propMap,
  listMap,
  find,
  link,
  upload,
  setSerial,
  requireScript,
  dev,
  ..._string,
  ..._user
}
