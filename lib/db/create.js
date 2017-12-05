/**
 * 数据库生成脚本
 * 
 */
var Field = require('../fields')
function create (model) {
  var str = `CREATE TABLE IF NOT EXISTS  \`${model.code}\` (
    \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT`
  for (let code in model.fields) {
    var field = model.fields[code]
    var require = field.required ? 'DEFAULT NULL' : ''
    str += ` , \`${code}\` ${Field.dbType(field.type)} ${require}\n`
  }
  str += ` , PRIMARY KEY (\`id\`)
    )ENGINE=InnoDB DEFAULT CHARSET=utf8`
  return str
}
module.exports = create
