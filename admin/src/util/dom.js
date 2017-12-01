// 将光标移动到文字尾部
export function cursorToLast (el) {
  if (navigator.userAgent.indexOf('MSIE') > -1) {
    let range = document.selection.createRange()
    el.last = range
    range.moveToElementText(this)
    range.select()
    document.selection.empty(); // 取消选中
  } else {
    let range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }
}

export function addClass (el, code) {
  if (!el.className.match(new RegExp('(\\s|^)' + code + '(\\s|$)', 'g'), '')) {
    el.className += ' ' + code
  }
}
export function removeClass (el, code) {
  return el.className.replace(new RegExp('(\\s|^)' + code + '(\\s|$)', 'g'), '')
}
export default {
cursorToLast}
