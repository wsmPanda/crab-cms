import code from './code'
import text from './text'
var FormConrol = {
  controls: {}
}

var controls = {
  text,
code}
for (let i in controls) {
  FormConrol.controls[`field_${i}`] = controls[i]
}

export default FormConrol
