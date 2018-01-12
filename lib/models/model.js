var DB = require('../db')
var Chain = require('./chain')
//TODO 添加事务
class DataModel {
  constructor(code, option) {
    this.code = code
    this.model = DB.model[code]
    this.code_id = this.code + '_id'
  }
  jsonModel(code) {
    return DB.model[code || this.code]
  }
  clearData(data) {
    var res = {}
    this.model = this.model || this.jsonModel()
    for (let code in data) {
      if (this.model.fields[code]) {
        res[code] = data[code]
      }
    }
    if (data.id) {
      res.id = data.id
    }
    return res
  }
  clearSlaveData(data, slave) {
    var res = {}
    for (let code in data) {
      if (this.model.slaves[slave].fields[code] && code !== 'id') {
        res[code] = data[code]
      }
    }
    return res
  }
  async eachSlave(cb) {
    //todo 改为all执行
    if (this.model && this.model.slaves) {
      for (let i in this.model.slaves) {
        await cb({
          code: i,
          ...this.model.slaves[i]
        }, this.code + '_' + i)
      }
    }
  }
  async list(data) {
    return this.command('select', data)
  }
  async page(data) {
    data = data || {}
    if (!data.pageSize || data.pageSize <= 0) {
      data.pageSize = 10
    }
    if (!data.pageOn || data.pageOn <= 0) {
      data.pageOn = 1
    }
    var dataset = await this.command('page', data)
    var count = await this.command('count', data.filter)
    return {
      data: dataset,
      pageOn: data.pageOn,
      pageSize: data.pageSize,
      totalCount: count[0]['count(*)'] || 0,
      pageCount: Math.floor((count[0]['count(*)'] - 1) / data.pageSize) + 1
    }
  }
  async save(data) {
    var res = await this.command('put', this.clearData(data))
    //处理子表数据
    await this.eachSlave(async(slave, code) => {
      //请求原数据
      await this.command('clear', {
        [this.code_id]: data.id
      }, code)
      //添加新数据
      for (let i in data[slave.code]) {
        await this.command('put', {
          [this.code_id]: data.id || res.insertId,
          ...this.clearSlaveData(data[slave.code][i],
            slave.code)
        }, code)
      }
    })
  }
  async delete(data) {
    return this.command('delete', data)
  }
  //查询单一数据 需取出第一条返回的数据
  async find(data) {
    if (typeof data === 'string') {
      data = {
        id: data
      }
    }
    var res = await this.command('find', data)
    if (res[0]) {
      await this.eachSlave(async(slave, code) => {
        res[0][slave.code] = await this.command('find', {
          [this.code_id]: data.id || res[0].id
        }, code)
      })
    }
    return res[0]
  }
  async check(data) {
    var res = await this.command('check', data)
    return res && res.length
  }
  //执行查询命令，查询表默认为当前表，可通过第三个参数指定表
  async command(command, data, table) {
    if (DB.sql[command]) {
      //进行数据库查询并返回Promise对象
      return this.query(DB.sql[command](table || this.code, data))
    } else {
      console.error(`model command error ${this.code}.${command}:`)
    }

  }
  //TODO 进行报错设置
  //直接进行查询
  async query(sql, data) {
    console.log('[SQL QUERY] '.data + sql)
    var res = {}
    try {
      const data = await DB.query(sql)
      res.rows = data[0]
    } catch (ex) {
      console.log('[SQL ERROR] '.error + ex)
    }
    return res.rows
  }
}

module.exports = DataModel
