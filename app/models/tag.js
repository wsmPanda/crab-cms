var Tag = {
  code: 'tag',
  name: '标签',
  fields: {
    name: {
      name: '名称',
      type: 'text',
      requred: true
    },
    create_time: {
      name: '创建时间',
      type: 'datetime',
      default: '@now',
      requred: true
    },
    memo: {
      name: '备注',
      type: 'text'
    }
  }
}
module.exports = Tag
