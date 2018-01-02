import code from './code'
import text from './text'
import html from './html'
import datetime from './datetime'
import state from './state'
import integer from './integer'
var FormConrol = {
  controls: {}
}

var controls = {
  text,
  datetime,
  state,
  code,
  integer,
  html,
ref: integer}
for (let i in controls) {
  FormConrol.controls[`field_${i}`] = controls[i]
}

export default FormConrol
