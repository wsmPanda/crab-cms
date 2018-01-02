/**
 * sql脚本拼接方法
 */

var _ = require('../util')

function tableName(table) {
  return '`model.' + table + '`'
}

function compose(str, params) {
  params = {
    pk: 'id',
    columns: '\*',
    ...params,
  }
  params.table = '`' + params.table + '`'
  return _.composeParams(str, params)
}
//将数值转化为sql语句中可以用的字符
function dataValue(v) {
  if (typeof v === 'string') {
    v = `"${v.replace(/"/img,'\\"')}"`
  }
  return v
}
module.exports = {
  select(table) {
    var params = {
      table
    }
    var str = 'select ${columns} from ${table} where 1=1'
    return compose(str, params)
  },
  check(table, data) {
    var params = {
      table
    }
    var str = 'select ${columns} from ${table} where 1=1'
    for (let i in data) {
      str += ` and \`${i}\`="${data[i]}"`
    }
    return compose(str, params)
  },
  find(table, data) {
    var params = {
      table
    }
    var str = 'select ${columns} from ${table} where 1=1'
    for (let i in data) {
      str += ` and \`${i}\`="${data[i]}"`
    }
    return compose(str, params)
  },
  page(table, {
    pageOn,
    pageSize,
    filter,
    order
  }) {
    var pageStart = (pageOn - 1) * pageSize
    var params = {
      table,
      pageOn,
      pageSize,
      pageStart: pageStart < 0 ? 0 : pageStart,
      condition: '',
      order: ''
    }
    if (filter) {
      for (let i in filter) {
        if (filter[i] !== undefined) {
          params.condition += `and ${i}=${dataValue(filter[i])}`
        }
      }
    }
    if (order && order.length) {
      params.order = `order by `
      for (let code of order) {
        if (code[0] === '-') {
          params.order += '`' + code.slice(1, code.length) + '` desc ,'
        } else {
          params.order += '`' + code + '`,'
        }
      }
      params.order = params.order.slice(0, -1)
    }
    var str = 'select ${columns} from ${table} where 1=1 ${condition} ${order} limit ${pageStart},${pageSize}'
    return compose(str, params)
  },
  count(table, condition) {
    var params = {
      table,
      condition: ''
    }
    if (condition) {
      for (let i in condition) {
        if (condition[i] !== undefined) {
          params.condition += `and ${i}=${dataValue(condition[i])}`
        }
      }
    }
    var str = 'select count(*) from ${table} where 1=1 ${condition}'
    return compose(str, params)
  },
  put(table, data) {
    var params = {
      keys: '',
      values: '',
      table
    }
    for (let i in data) {
      var value = data[i]
      params.keys += i + ','
      params.values += dataValue(value) + ','
    }
    if (params.keys.length) {
      params.keys = params.keys.slice(0, -1)
      params.values = params.values.slice(0, -1)
    }
    var str = 'replace into ${table} (${keys}) values (${values})'
    return compose(str, params)
  },
  delete(table, ids) {
    var params = {
      table
    }
    var str = 'delete from ${table} WHERE 1=0 or' + ` \${pk} in (${ids.join(',')})`
    return compose(str, params)
  },
  update(table, data) {
    var params = {
      table,
      id: data.id
    }
    params.setValues = ""
    for (let i in data) {
      params.setValues += ` ${i}=${dataValue(data[i])},`
    }
    if (params.setValues.length) {
      params.setValues.slice(0, -1)
    }
    var str = 'upfate ${table} set ${setValues} WHERE 1=1 and id=${id}'
    return compose(str, params)
  }
}
