const Time = {
  now() {
    return Date.parse(new Date())
  },
  // 时间戳转为文字
  toTime(t) {
    if (typeof t === 'string') {
      let temp = parseInt(t)
      if (!Number.isNaN(temp)) {
        t = temp
      }
    }
    return Time.format(new Date(t), 'yyyy-MM-dd hh:mm:ss')
  },
  toDate(t) {
    if (typeof t === 'string') {
      let temp = parseInt(t)
      if (!Number.isNaN(temp)) {
        t = temp
      }
    }
    return Time.format(new Date(t), 'yyyy-MM-dd')
  },
  // 文字转为时间戳
  toTs(t) {
    return new Date(t).getTime()
  },
  format(t, fmt) {
    if (!t || t.toString() === 'Invalid Date') {
      return ''
    }
    var o = {
      'M+': t.getMonth() + 1, // 月份 
      'd+': t.getDate(), // 日 
      'h+': t.getHours(), // 小时 
      'm+': t.getMinutes(), // 分 
      's+': t.getSeconds(), // 秒 
      'q+': Math.floor((t.getMonth() + 3) / 3), // 季度 
      'S': t.getMilliseconds() // 毫秒 
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
module.exports = Time
