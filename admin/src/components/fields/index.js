import code from './code'
import text from './text'
import datetime from './datetime'
import state from './state'

var FormConrol = {
  controls: {}
}

var controls = {
  text,
  datetime,
  state,
code}
for (let i in controls) {
  FormConrol.controls[`field_${i}`] = controls[i]
}

export default FormConrol
