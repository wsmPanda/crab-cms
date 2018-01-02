var DB = require('../db')
var Chain = require('./chain')
class DataModel {
  constructor(code, option) {
    this.code = code
  }
  jsonModel(code) {
    return DB.model[code]
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
    return this.command('put', data)
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
    return res[0]
  }
  async check(data) {
    var res = await this.command('check', data)
    return res && res.length
  }
  async command(command, data) {
    if (DB.sql[command]) {
      //进行数据库查询并返回Promise对象
      return this.query(DB.sql[command](this.code, data))
    } else {
      console.error(`model command error ${this.code}.${command}:`)
    }

  }
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
