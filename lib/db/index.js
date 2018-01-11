/**
 * 数据库接口
 * 提供数据库交互方法
 */
var connection = require('./connection')
var sql = require('./sql')
var createTable = require('./create')
var log4js = require('log4js')
var logger = log4js.getLogger('sql')
var wrapper = x => `"${x}"`

var DB = {
  async connection() {
    return await connection
  },
  //检查并注册model
  async registerModel(model) {
    /**
     * TODO:初始化数据库判断
     * 查询是否存在当前定义表
     * 对比定义的表结构，根据mmodel定义变化表结构
     * 添加系统表记录model信息
     */
    await DB.query(createTable.main(model))
    for (let i in model.fields) {
      let field = model.fields[i]
      if (field.type === 'refs') {
        await DB.query(createTable.refs(model, {
          code: i,
          ...field
        }))
      }
    }
    for (let i in model.slaves) {
      let slave = model.slaves[i]
      await DB.query(createTable.table(slave, model.code + '_' + i, {
        [model.code + '_id']: {
          code: model.code + '_id', 
          type: 'code'
        }
      }))

    }
    DB.model[model.code] = model
  },
  async query(str) {
    var con = await connection.getConnection()
    logger.info(str)
    return con.execute(str).then((res) => {
      con.release()
      return res
    })
  },
  sql: sql,
  model: {}
}
module.exports = DB
