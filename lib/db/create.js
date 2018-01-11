/**
 * 数据库生成脚本
 * 
 */
var Field = require('../fields')

function table(model, code, extField = {}) {
  var fields = {
    ...extField,
    ...model.fields
  }
  var str = `CREATE TABLE IF NOT EXISTS  \`${code}\` (
    \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT`
  for (let code in fields) {
    var field = fields[code]
    var require = field.required ? 'DEFAULT NULL' : ''
    str += ` , \`${code}\` ${Field.dbType(field.type)} ${require}\n`
    // 对ref类型增加名称缓存字段
    if (field.type === 'ref') {
      str += ` , \`${code}_name\` ${Field.dbType('code')}\n`
    }
  }
  str += ` , PRIMARY KEY (\`id\`)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8`
  return str
}

function refs(model, field) {
  var str = `CREATE TABLE IF NOT EXISTS  \`${model.code}_rlt_${field.rangeset.code}\` (
    \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT,
    \`${model.code}_id\` int(10) NOT NULL,
    \`${field.rangeset.code}_id\` int(10) NOT NULL`
  str += ` , PRIMARY KEY (\`id\`)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8`
  return str
}

function main(model) {
  return table(model, model.code)
}
// 子表建立
function slave() {}
module.exports = {
  table,
  main,
  refs,
  slave
}
