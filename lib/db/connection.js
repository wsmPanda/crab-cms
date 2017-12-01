/**
 * 数据库连接
 * 返回连接池对象
 */
const mysql = require('mysql2/promise')
const config = require('../../config/db')

const connectionPool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database
})
module.exports = connectionPool
