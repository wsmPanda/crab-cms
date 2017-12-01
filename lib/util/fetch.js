import request from 'request'
// 访问外部链接
const fetch = function (opt) {
  var o = {
    method: 'GET'
  }
  if (opt.url) {
    o = opt
  } else {
    o.url = opt
  }
  return new Promise((resolve, reject) => {
    request(o, function (error, response, body) {
      if (body) {
        // 返回的body为字符串，需转化为json对象
        resolve(JSON.parse(body))
      } else {
        reject(error)
      }
    })
  })
}
