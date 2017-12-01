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
  find(table, id) {
    var params = {
      table,
      id
    }
    var str = 'select ${columns} from ${table} where 1=1 and id=${id}'
    return compose(str, params)
  },
  page(table, {
    pageOn,
    pageSize
  }) {
    var params = {
      table
    }
    var pageStart = pageOn * pageSize
    var str = 'select ${columns} from ${table} where id >= (select ${pk} from ${table} limit ${pageStart}, ${pageSize}) LIMIT ${pageSize};'
    return compose(str, params)
  },
  put(table, data) {
    var params = {
      keys: data,
      values: data,
      table
    }
    var str = 'replace into ${table}(${keys})values(${values})'
    return compose(str, params)
  },
  delete(table, ids) {
    var params = {
      table
    }
    var conditicon = `${pk} in (${ids.join(',')})`
    var str = 'delete from ${table} WHERE 1=0 or {condition}'
    return compose(str, params)
  },
  count(table, data) {
    var params = {
      table
    }
    var str = 'select count(*) from ${table} where 1=1'
    return compose(str, params)
  }
}
