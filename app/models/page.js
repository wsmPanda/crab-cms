var Article = {
  code: 'page',
  name: '导航页面',
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
    memo: {
      name: '备注',
      type: 'memo',
      requred: false
    },
    parent: {
      name: '上级页面',
      type: 'ref',
      rangeset: {
        code: 'user'
      }
    },
    author: {
      name: '作者',
      type: 'ref',
      rangeset: {
        code: 'user'
      }
    }

  }
}
module.exports = Article