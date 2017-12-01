import $ from 'util'
const Render = {
  tag: {
    // 身份证号，显示生日日期
    cert_code: {
      render({node, text}) {
        text = text || ''
        var year = text.substring(6, 10)
        var date = text.substring(10, 14)
        if (text.length && year.length) {
          text = text.replace(year, `<a>${year}</a>`)
          text = text.replace(date, `<span class="light">${date}</span>`)
          node.innerHTML = text
        }
      }
    },
    badge_case_process: {
      render({node, text, field, row, value}) {
        var className = 'badge badge-case_process'
        if (text === '新') {
          className += ' badge-case_process-new'
        }
        if (text && text !== '' && text !== ' ') {
          node.innerHTML = `<span class="${className}">${text}</span>`
        }
      }
    }
  },
  tpl(str, field, row) {
    str = `<div>${str}</div>`
    var doc = new DOMParser().parseFromString(str, 'text/xml').children[0]
    $.eachChild({
      data: doc,
      handler: (node) => {
        if (Render.tag[node.nodeName]) {
          Render.tag[node.nodeName].render({
            node,
            text: node.innerHTML,
            field,
            row,
          value: row[field.code]})
        }
      }
    })
    return doc.innerHTML
  }
}
export default Render
