;
(function ($) {
  $.link = (url, data, setting) => {
    setting = setting || {}
    return new Promise((resolve, reject) => {
      $.ajax({
        type: setting.method || 'POST',
        url: url,
        contentType: 'application/json; charset=utf-8',
        data: data ? JSON.stringify(data) : null,
        dataType: 'json',
        success: function (res) {
          resolve(res)
        },
        error: function (res) {
          reject(res)
        }
      })
    })
  }
  $.templates = {}
  $.getTpl = (code) => {
    return new Promise((resolve, reject) => {
      if ($.templates[code]) {
        resolve($.templates[code])
      } else {
        $.get('/template/articleComment.hbs').then((res) => {
          $.templates[code] = window.Handlebars.compile(res)
          resolve($.templates[code])
        })
      }
    })
  }
  $(document).on('ready', () => {
    window.Handlebars.registerHelper({
      for: function () {
        let args = Array.prototype.slice.call(arguments)
        let options = args.pop()
        let count = args[0]
        let ret = ``
        for (var i = 0; i < count; i++) {
          ret = ret + options.fn({
            ...options.hash,
            i: i + 1
          })
        }
        return ret
      },
      equal: function (v1, v2, opts) {
        if (v1 == v2) {
          return opts.fn(this);
        } else {
          return opts.inverse(this);
        }
      }
    })
  })
})(window.$)
