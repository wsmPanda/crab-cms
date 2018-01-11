var form_data = {
  code: 'form_data',
  name: '表单数据',
  fields: {
    user_id: {
      name: '用户',
      type: 'code'
    },
    create_time: {
      name: '创建时间',
      type: 'time'
    },
    struct_id: {
      name: '表单',
      type: 'ref'
    },
    content: {
      name: '内容',
      type: 'json_data',
      editable: false
    }
  }
}
module.exports = form_data
