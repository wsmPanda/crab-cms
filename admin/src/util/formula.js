/*
 * 计算公式解析工具方法
 * 为保持通用性避免使用es6特性
 */
export default function mathEval (str, data, throwError = false) {
  data = data || {}
  // 处理字符串
  var temp = replaceString(str, data)
  str = temp.str
  data = temp.data
  let exp = serializeExp(str)
  let outQueue = []
  // 添加外部括号简化处理流程
  try {
    // 中缀表达式转化为后缀表达式
    outQueue = expConvert(exp)
    // 返回中缀表达式计算结果
    return compExp(outQueue, data)
  } catch (ex) {
    console.warn('公式解析错误:' + ex)
    console.warn(str)
    if (throwError) throw new Error(ex)
    return 0
  }
}
// 表达式合法性检测
export function expValidate (str) {
  let exp = serializeExp(str)
  var l = true
  try {
    expConvert(exp, true)
  } catch (ex) {
    console.warn('公式解析错误:' + ex)
    console.warn(str)
    l = false
  }
  return l
}
// 返回计算方法，使用预处理用于表达式的多次计算
export function mathEvaler (str) {
  var exp = serializeExp(str)
  // 添加外部括号简化处理流程
  try {
    var outQueue = expConvert(exp)
    return (data) => {
      // 需要复制数组，因为计算会破坏数组数据
      return compExp(JSON.parse(JSON.stringify(outQueue)), data || {})
    }
  } catch (ex) {
    console.warn('公式解析错误:' + ex)
    console.warn(str)
    return false
  }
}
// 将表达式中的字符串转化为变量
function replaceString (str, data) {
  str = str.replace(/'(.*?)'/, (item, code) => {
    var codeName = '_string_' + code
    data[codeName] = code
    return codeName
  })
  str = str.replace(/"(.*?)"/, (item, code) => {
    var codeName = '_string_' + code
    data[codeName] = code
    return codeName
  })
  return {
    str,
  data}
}
// 序列化表达式
function serializeExp (str) {
  str = '(' + trimSpace(str) + ')'
  let exp = []
  // 解析出数字符号和变量
  for (let i = 0; i < str.length; i++) {
    let char = str[i]
    if (char !== ' ') {
      if (Operator[char]) {
        exp.push(char)
      } else {
        // 提取数字和变量
        let j = i + 1
        let temp = char
        while (str[j] && !Operator[str[j]]) {
          temp = temp + str[j]
          j++
        }
        i = j - 1
        exp.push(temp)
      }
    }
  }
  return exp
}
// 逆波兰表示式转换
function expConvert (exp) {
  // 表示式输出队列
  let out = []
  // 计算符号栈
  let opt = []
  while (exp.length) {
    let i = exp.shift()
    // 判断是否为多字符计算符号
    if (exp[0] && Operator[i + exp[0]]) {
      i = i + exp.shift()
    }
    if (Operator[i]) {
      if (i === '(') {
        opt.push(i)
      } else if (i === ')') {
        while (opt.length && opt[opt.length - 1] !== '(') {
          out.push(opt.pop())
        }
        if (opt[opt.length - 1] !== '(') {
          throw new Error('括号嵌套错误')
        } else {
          opt.pop()
        }
      } else {
        // 计算符号
        while (opt.length && compareOpt(i, opt[opt.length - 1])) {
          out.push(opt.pop())
        }
        opt.push(i)
      }
    } else {
      out.push(i)
    }
  }
  return out
}
// 表达式计算
function compExp (queue, data) {
  let out = []
  // 预处理先行替换变量 避免出现字符串循环引用的情况
  queue.forEach((i, index) => {
    if (!Operator[i] && isNaN(i)) {
      if (data[i] !== undefined) {
        queue[index] = data[i]
      } else {
        queue[index] = 0
      }
    }
  })
  while (queue.length) {
    let i = queue.shift()
    if (Operator[i]) {
      if (out.length >= 2) {
        let n1
        let n2
        // 对数字类型进行处理
        if (Operator[i].requireNumber !== false) {
          n1 = toNubmer(out.pop())
          n2 = toNubmer(out.pop())
        } else {
          n1 = out.pop()
          n2 = out.pop()
        }
        out.push(Operator[i].comp(n2, n1))
      } else {
        throw new Error('公式符号错误')
      }
    } else {
      out.push(i)
    }
  }
  return out[0]
}
// 判断优先级
function compareOpt (a, b) {
  return Operator[a].level <= Operator[b].level
}

// 去除空格
function trimSpace (exp) {
  return exp.replace(/\s/g, '')
}

// 获取变量数字
function toNubmer (num) {
  if (num === false || num === true) {
    return num
  }
  if (isNaN(num)) {
    return 0
  } else {
    return Number.parseFloat(num)
  }
}

// 计算符号优先级和计算方法设置
export const Operator = {
  '&&': {
    level: 1,
    name: '并且',
    code: 'and',
    comp(a, b) {
      return a && b
    }
  },
  '&': {
    level: 1,
    name: '并且',
    code: 'and',
    comp(a, b) {
      return a && b
    }
  },
  '|': {
    level: 1,
    name: '或者',
    code: 'or',
    comp(a, b) {
      return a || b
    }
  },
  '||': {
    level: 1,
    name: '或者',
    code: 'or',
    comp(a, b) {
      return a || b
    }
  },
  '>': {
    level: 2,
    name: '大于',
    code: 'gt',
    comp(a, b) {
      return a > b
    }
  },
  '<': {
    level: 2,
    name: '小于',
    code: 'lt',
    comp(a, b) {
      return a < b
    }
  },
  '>=': {
    level: 2,
    name: '大于等于',
    code: 'gte',
    comp(a, b) {
      return a >= b
    }
  },
  '<=': {
    level: 2,
    name: '小于等于',
    code: 'lte',
    comp(a, b) {
      return a <= b
    }
  },
  '==': {
    level: 2,
    name: '等于',
    code: 'eq',
    requireNumber: false,
    comp(a, b) {
      return a === b
    }
  },
  '=': {
    level: 2,
    name: '等于',
    code: 'eq',
    requireNumber: false,
    comp(a, b) {
      return a === b
    }
  },
  '!': {
    level: 2,
    name: '非',
    code: 'not',
    requireNumber: false,
    comp(a, b) {
      return a !== b
    }
  },
  '!=': {
    level: 2,
    name: '不等于',
    code: 'neq',
    requireNumber: false,
    comp(a, b) {
      if ((a !== 0 && b !== 0) && (!a || a === '') && (!b || b === '')) {
        return false
      }
      return a !== b
    }
  },
  '!==': {
    level: 2,
    name: '不等于',
    code: 'neq',
    requireNumber: false,
    comp(a, b) {
      if ((a !== 0 && b !== 0) && (!a || a === '') && (!b || b === '')) {
        return false
      }
      return a !== b
    }
  },
  '+': {
    level: 3,
    code: 'add',
    comp: add
  },
  '-': {
    level: 3,
    code: 'sub',
    comp: sub
  },
  '*': {
    level: 4,
    code: 'mul',
    comp: mul
  },
  '/': {
    level: 4,
    code: 'div',
    comp: div
  },
  '(': {
    level: 0
  },
  ')': {
    level: 0
  }
}

// 计算方法设置（使用凑整数的方法处理js浮点计算问题）
function add (a, b) {
  let c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (mul(a, e) + mul(b, e)) / e
}

function sub (a, b) {
  let c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (mul(a, e) - mul(b, e)) / e
}

function mul (a, b) {
  let c = 0
  let d = a.toString()
  let e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}

function div (a, b) {
  let c, d, e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  return mul(c / d, Math.pow(10, f - e))
}

// 序列化条件表达式，转化为基础树形结构列表
export function serializeCondition (str) {
  var exp = serializeExp(str)
  var list = []
  getConditionTree(exp, 0, list)
  var tree = conditionTreepurify(list)
  return typeof tree === 'string' ? [tree] : tree
}
// 生成完整的属性结构对象
export function buildConditionTree (str) {
  var list = serializeCondition(str)
  var tree = buildTree(list)
  return tree
}

function buildTree (list) {
  list = list || []
  var tree = {
    expand: true,
    classes: ['node-empty'],
    children: []
  }
  list.forEach((item, i) => {
    if (isArray(item)) {
      tree.children.push(buildTree(item))
    } else {
      tree.children.push({
        title: item
      })
    }
  })
  if (!tree.children.length) {
    delete tree.children
  }
  return tree
}

var conditionSet = new Set(['&', '&&', '|', '||'])

// 简化条件树，合并没有条件判断的括号
function conditionTreepurify (exp) {
  var hasCondition = false
  for (let i = 0; i < exp.length; i++) {
    let item = exp[i]
    if (conditionSet.has(item)) {
      hasCondition = true
    }
    if (isArray(item)) {
      exp[i] = conditionTreepurify(item)
    }
    // 若返回的数据为数组，则其中存在条件符号
    if (!hasCondition && isArray(exp[i])) {
      hasCondition = true
    }
  }
  // 若当前表达式片段不存在条件符号，则将其转化为字符串
  if (!hasCondition) {
    exp = exp.join('')
  }
  return exp
}

function getConditionTree (exp, count, list) {
  // 当前处理变量指针，+1是为了避开首个前括号
  var i = count + 1
  var fragment = ''
  while (i < exp.length && exp[i] !== ')') {
    var char = exp[i]
    if (char === '(') {
      // 对于括号内的表达式建立新的数组，递归获得结果
      if (fragment && fragment.length) {
        if (Operator[exp[i - 2] + exp[i - 1]]) {
          list.push(fragment.slice(0, -2))
          list.push(exp[i - 2] + exp[i - 1])
          fragment = ''
        } else if (Operator[exp[i - 1]]) {
          list.push(fragment.slice(0, -1))
          list.push(exp[i - 1])
          fragment = ''
        }
      }
      var newList = []
      list.push(newList)
      // 结果返回括号内的表达式长度，添加到当前指针的长度，可以跳过这段表达式，包括其中的后括号，以防指针识别到后括号之后跳出循环
      i = getConditionTree(exp, i, newList) + 1
    } else if (conditionSet.has(char) || conditionSet.has(exp[i] + exp[i + 1])) {
      // 扫描到条件符号则将当前记录的表达式片段加入列表
      if (fragment && fragment.length) {
        list.push(fragment)
      }
      fragment = ''
      if (conditionSet.has(exp[i] + exp[i + 1])) {
        list.push(exp[i] + exp[i + 1])
        i = i + 2
      } else {
        list.push(exp[i])
        i = i + 1
      }
    } else {
      fragment += char
      i++
      // 最后一个片段导入
      if (exp[i] === ')') {
        list.push(fragment)
        fragment = ''
      }
    }
  }
  return i
}

function isArray (object) {
  return object && typeof object === 'object' &&
    Array === object.constructor
}
