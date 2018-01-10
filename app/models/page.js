var Article = {
  code: 'page',
  name: '页面',
  type: 'tree',
  fields: {
    title: {
      name: '标题',
      type: 'code',
      requred: true
    },
    code: {
      name: '编码',
      type: 'code',
      requred: true
    },
    create_time: {
      name: '创建时间',
      type: 'datetime',
      default: '@now',
      requred: true
    },
    state: {
      name: '状态',
      type: 'state',
      default: '0',
      rangeset: {
        0: '草稿',
        1: '发布'
      },
      requred: true
    },
    json_data: {
      name: '额外数据',
      type: 'json',
      requred: false
    },
    memo: {
      name: '备注',
      type: 'memo',
      requred: false
    },
    parent: {
      name: '上级页面',
      type: 'ref',
      rangeset: {
        code: 'page',
        title: 'title'
      }
    },
    author: {
      name: '作者',
      type: 'ref',
      rangeset: {
        code: 'user'
      }
    },
    custom_data: {
      name: '内容数据',
      locate: 'tab',
      type: 'json',
      list_pos: 0
    },
    custom_scheme: {
      name: '内容结构',
      locate: 'tab_adv',
      type: 'json_scheme',
      list_pos: 0
    }
  }
}
module.exports = Article
