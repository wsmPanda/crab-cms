const fieldType = {
  text: 'text',
  html: 'text',
  code: 'varchar(255)',
  datetime: 'timestamp',
  state: 'varchar(255)',
  ref: 'varchar(255)'
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
