import Path from './path'
import { link, upload, download, submitForm } from './main'
export * from './main'
export function linkPath (action, data, setting = {}) {
  var path = Path[action] || Path.action
  if (!Path[action]) {
    setting.param = setting.param || {}
    setting.param.action = setting.param.action || action
  }
  return link(path, data, setting)
}

const modelList = {}

function parseItem (model, code) {
  var _code = '_' + code
  model[_code] = model[code]
  model[code] = []
  for (let i in model[_code]) {
    var item = model[_code][i]
    item.code = i
    model[[code]].push(item)
  }
  return model
}

export function fetchModel (code) {
  if (modelList[code]) {
    return new Promise((resolve) => {
      resolve(modelList[code])
    })
  } else {
    return linkPath('model', null, {
      param: {
      code}
    }).then((res) => {
      var model = res.data

      parseItem(model, 'fields')

      model._slaves = model.slaves
      model.slaves = []
      for (let i in model._slaves) {
        var slave = model._slaves[i]
        slave.code = i
        parseItem(slave, 'fields')
        model.slaves.push(slave)
      }

      modelList[code] = res.data
      return res.data
    })
  }
}

export default {
  linkPath,
  link,
  upload,
  download,
  submitForm,
fetchModel}
