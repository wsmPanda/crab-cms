const fieldType = {
  text: 'text',
  code: 'varchar(255)',
  datetime: 'timestamp',
  state: 'int(11)'
}

function dbType (type) {
  if (fieldType[type]) {
    return fieldType[type]
  } else {
    return fieldType.code
  }
}

module.exports = {
dbType}
