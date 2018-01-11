var Article = {
  code: 'page',
  name: '页面',
  type: 'tree',
  groups: {
    relate: {
      name: '关联内容',
      locate: 'right'
    },
    setting: {
      name: '页面设置',
      locate: 'right'
    },
    tab_data: {
      name: '页面数据',
      locate: 'left',
      dispaly: 'tab'
    },
    tab_struct: {
      name: '页面数据定义',
      locate: 'left',
      dispaly: 'tab'
    }
  },
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
      requred: true,
      group: 'setting'
    },
    state: {
      name: '状态',
      type: 'state',
      default: '0',
      rangeset: {
        0: '草稿',
        1: '发布'
      },
      requred: true,
      group: 'setting'
    },
    memo: {
      name: '备注',
      type: 'memo',
      requred: false
    },
    parent: {
      name: '上级页面',
      type: 'ref',
      group: 'relate',
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
      },
      group: 'setting'
    },
    custom: {
      name: '内容数据',
      locate: 'tab',
      type: 'json',
      list_pos: 0,
      group: 'tab_data'
    },
    custom_scheme: {
      name: '内容结构',
      locate: 'tab_adv',
      type: 'json_scheme',
      group: 'tab_struct',
      list_pos: 0
    }
  }
}
module.exports = Article
