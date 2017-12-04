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
      model._fields = model.fields
      model.fields = []
      for (let i in model._fields) {
        var field = model._fields[i]
        field.code = i
        model.fields.push(field)
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
