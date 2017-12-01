import $ from './string'
const Link = {}
const methodList = ['post', 'get', 'put', 'delete']
methodList.forEach((i) => {
  Link[i] = function (url, data, setting) {
    setting.method = i.toUpperCase()
    return link(url, data, setting)
  }
})

export default {
  Link,
  link,
  submitForm,
  download,
  upload: submitForm
}

export function submitForm(url, data, setting) {
  setting = setting || {}
  setting.fileCode = setting.fileCode || 'file'
  if (url && url[0] !== '/') url = '/' + url
  url = $.composePath(url, setting.param)
  setting.method = setting.method || 'POST'
  var xhr = new XMLHttpRequest()
  var formData = new FormData(setting.form)

  if (setting.file) {
    formData.append(setting.fileCode, setting.file)
  } else if (setting.files) {
    // 多文件上传处理
    for (let i = 0; i < setting.files.length; i++) {
      formData.append(setting.fileCode, setting.files[i])
    }
  } else {
    if (data) {
      for (let i in data) {
        formData.append(setting.fileCode, data[i])
      }
    }
  }

  return new Promise((resolve, reject) => {
    xhr.addEventListener('load', (e) => {
      var response = e.target
      if (response.status !== 200 && response.status !== 304) {
        reject(response)
        throw (response)
      }
      let json = JSON.parse(response.response)
      if (json.status === 0 || (json.status === 1 && json.data && json.data.error)) {
        reject(json)
      } else {
        resolve(json)
      }
    }, false)
    xhr.open(setting.method, url)
    xhr.send(formData)
  }).catch((res) => {
    if (!setting.mute) {
      if (window.LinkErrorHandler) {
        window.LinkErrorHandler(res)
      }
    }
    if (setting.fail) {
      setting.fail()
    }
    throw new Error(res)
  })
}
export function upload(url, data, setting) {
  return submitForm(url, data, setting)
}
export function addUrlQuery(url, query) {
  if (!url || !query) return url
  if (url.indexOf('?') < 0) {
    url += '?'
  } else {
    url += '&'
  }
  for (let i in query) {
    url += `${i}=${query[i]}&`
  }
  return url.slice(0, -1)
}

export function download(url, data, setting) {
  setting = setting || {}
  data = data || {}
  url = $.composePath(url, setting.param)
  var req = linkProcess(url, data, setting, req)
  req.body = JSON.stringify(data)
  setting.data = data
  if (setting.query) {
    url = addUrlQuery(url, setting.query)
  }
  return downloadPromise(url, req, setting)
}

/**
 * 通过iframe提交form下载文件
 * 备用方案 
 */
export function formDownload(url, options = {}) {
  var $iframe = document.createElement("iframe");
  var $form = document.createElement("form");
  $iframe.setAttribute('id', "down-file-iframe")
  $form.setAttribute('method', options.method || "post")
  $form.setAttribute('target', "down-file-iframe")
  $form.setAttribute('action', url)
  for (let key in options.data) {
    let $input = document.createElement("input");
    $input.setAttribute('type', "hidden")
    $input.setAttribute('name', key)
    $input.setAttribute('value', JSON.stringify(options.data[key]))
    $form.append($input);
  }
  $iframe.append($form);
  document.body.append($iframe);
  $form.submit();
  $iframe.remove();
}

var createDownloadFile = function (response) {
  // 字符内容转变成blob地址
  return new Promise((resolve, reject) => {
    response.blob().then((blob) => {
      //数据类型判断 若为json则尝试解析并判断是否需要报错
      //待改进，把判断放在fetch请求中
      if (blob.type === 'application/json') {
        let reader = new FileReader()
        reader.readAsText(blob)
        reader.onload = (e) => {
          var res = null
          try {
            res = JSON.parse(reader.result)
          } catch (ex) {}
          if (res && res.status === 0) {
            reject(res)
          } else {
            resolve(blob)
          }
        }
      } else {
        resolve(blob)
      }
    })
  })
};

function donwloadBlob(blob, filename) {
  // 创建隐藏的可下载链接
  var eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}


function downloadPromise(url, req, setting) {
  if (url && url[0] !== '/') url = '/' + url
  return new Promise((resolve, reject) => {
    if (req.body && req.method === 'GET' || req.method === 'get') {
      req.body = null
    }
    fetch(url, req).then(function (response, ...t) {
      if ((response.status !== 200 && response.status !== 304) || !response.json) {
        throw (response)
      }
      var fileName = '导出文件' + Date.parse(new Date()) + '.xls'
      var disposition = response.headers.get('Content-Disposition')
      if (disposition) {
        var match = disposition.match(/(?:^|;|\s)filename=(.*?)(?:\s|;|$)/im)
        if (match && match[1]) {
          fileName = match[1]
        }
      }
      if (fileName.indexOf('.') < 0) {
        fileName += '.xls'
      }
      createDownloadFile(response).then((blob) => {
        donwloadBlob(blob, fileName)
        resolve(response)
      }).catch(res => {
        window.LinkErrorHandler(res)
        reject(res)
      })
    }).catch((res) => {
      if (!setting.mute) {
        if (window.LinkErrorHandler) {
          window.LinkErrorHandler(res)
        }
      }
      if (setting.fail) {
        setting.fail()
      }
      reject(res)
    })
  })
}


/**fetch请求 */
export function link(url, data, setting) {
  setting = setting || {}
  data = data || {}
  url = $.composePath(url, setting.param)
  var req = linkProcess(url, data, setting, req)
  req.body = JSON.stringify(data)
  setting.data = data
  if (setting.query) {
    url = addUrlQuery(url, setting.query)
  }
  return linkPromise(url, req, setting)
}



const defLinkSetting = {
  method: 'POST',
  // 表单提交模式
  formData: false,
  // 强制设定link模式 rest|mop|wx    
  mode: 'rest',
  // 静默报错
  mute: false,
  // 网络错误处理
  handleError: true
}

function linkProcess(url, data, setting) {
  setting = Object.assign({}, defLinkSetting, setting)
  var req = {
    method: setting.method,
    'Accept': 'application/json',
    cache: 'reload',
    credentials: 'include',
    contentType: 'application/json;charset=utf-8',
    type: 'json',
    dataType: 'json',
    headers: {
      'content-type': 'application/json;charset=utf-8',
      'cache-control': 'no-cache'
    }
  }
  return req
}

function linkPromise(url, req, setting) {
  if (url && url[0] !== '/') url = '/' + url
  //临时设置，默认开启重试 app外的调用需注意
  if (setting.retry !== false) {
    setting.retry = true
  }
  //需要身份验证
  if (setting.author !== false) {
    setting.author = true
  }
  return new Promise((resolve, reject) => {
    if (req.body && req.method === 'GET' || req.method === 'get') {
      req.body = null
    }
    fetch(url, req).then(function (response) {
      if ((response.status !== 200 && response.status !== 304) || !response.json) {
        throw (response)
      }
      let data = response.json()
      return data
    }).then(function (json) {
      if (json.status === 0 || (json.status === 1 && json.data && json.data.error)) {
        if (!setting.mute) {
          if (window.LinkErrorHandler) {
            var option = {
              //普通报错结束回调
              done() {
                reject(json)
              },
              //失败后进行身份验证
              author: setting.author
            }
            // 重试选项 通过传递报错设置来进行重试
            /* 
            主要应用于身份检测后的请求重试
            通过劝酒设置的$.LinkErrorHandler 方法，转到 $.loginCheck
            当重新登录成功需要重试时，通过optiong.retry 重新尝试调用link
            */
            if (setting.retry) {
              option.retry = function () {
                // 重复调用 关闭重复调用选项，防止循环调用
                link(url, setting.data, {
                  ...setting,
                  retry: false
                }).then((res) => {
                  resolve(res)
                }).catch((res) => {
                  reject(res)
                })
              }
            }
            window.LinkErrorHandler(json, option)
          }
        }
        if (setting.fail) {
          setting.fail()
        }
        if (!setting.retry || !window.LinkErrorHandler) {
          reject(json)
        }
      } else {
        resolve(json)
      }
    }).catch((res) => {
      if (!setting.mute) {
        if (window.LinkErrorHandler) {
          window.LinkErrorHandler(res)
        }
      }
      if (setting.fail) {
        setting.fail()
      }
      reject(res)
    })
  })
}
