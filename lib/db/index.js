/**
 * 数据库接口
 * 提供数据库交互方法
 */
var connection = require('./connection')
var sql = require('./sql')


module.exports = {
    async connection() {
        return await connection
    },
    async checkModel() {},
    async query(str) {
        var con = await connection.getConnection()
        return con.execute(str)
    },
    sql: sql
}