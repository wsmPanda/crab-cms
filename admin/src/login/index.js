import '@/style/login.less'
import md5 from './md5'
import _ from 'util'

;(function () {
  var $ = (...arg) => document.querySelectorAll(...arg)
  if (!$('.form-login').length) {
    return
  }
  var hasCard = false
  if (!hasCard) {
    $('.card-item')[0].style.display = 'none'
    $('.card')[0].removeAttribute('required')
    $('input[name=card]')[0].removeAttribute('name')
  }

  Array.prototype.forEach.call($('input'), (item) => item.addEventListener('input', () => {
    $('.login-error')[0].innerHTML = null
  }))

  $('.form-login')[0].addEventListener('submit', (e) => {
    e.preventDefault()
    var name = $('input[class=name]')[0].value
    var password = $('input[class=password]')[0].value
    window.LinkErrorHandler = (res) => {
      loginError(res.buz_error_msg || '登录错误！')
    }
    let app = 'cs'
    var appMeta = document.querySelector('meta[name=APP_CODE]')
    if (appMeta) {
      app = appMeta.attributes.content.value
    }
    _.link(`/admin/service/signin?name=${name}&password=${md5(name,password)}`, {
      method: 'get',
      retry: false
    }).then((res) => {
      var user = _.local('user') || {}
      user[app] = res.data
      _.local('user', user)
      window.location.href = '/?_=' + Date.parse(new Date())
    })
  })
  function loginError (text) {
    $('.login-error')[0].innerHTML = text
  }
})()
