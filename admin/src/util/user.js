import { link } from './link'
import $ from 'util'
const nodesPath = 'service/{app}/nodes?account_code={account_code}'
export function returnToLogin () {
  if (!document.querySelector('.form-login')) {
    window.location.href = '/login.html'
  }
}
export function checkUser () {
  return new Promise((resolve, reject) => {
    var user = window.localStorage.user
    if (user) {
      user = JSON.parse(user)[window.App]
      link(nodesPath, null, {
        param: user
      }).then((res) => {
        window.NodesData = res.data
        $.eachChild({
          data: window.NodesData,
          handler(item) {
            if (item.is_def) {
              $.indexCode = $.getNodeCode(item.code)
            }
          }
        })
        resolve()
      }
      ).catch(() => reject())
    } else {
      reject()
    }
  })
}
export default {
  returnToLogin,
checkUser}
