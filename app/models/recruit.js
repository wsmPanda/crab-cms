var recruit = {
  code: 'recruit',
  name: '招聘信息',
  layout: 'panel',
  groups: {
    info: {
      name: '状态信息',
      locate: 'right'
    }
  },
  fields: {
    job: {
      name: '职位',
      type: 'code',
      requred: true
    },
    position: {
      name: '工作地点',
      type: 'code'
    },
    education: {
      name: '学历',
      type: 'code'
    },
    count: {
      name: '数量',
      type: 'integer'
    },
    description: {
      name: '职位要求',
      type: 'html'
    },
    duty: {
      name: '岗位职责',
      type: 'html'
    },
    create_time: {
      name: '创建时间',
      type: 'datetime',
      default: '@now',
      requred: true,
      group: 'info'
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
      group: 'info'
    },
    author: {
      name: '作者',
      type: 'ref',
      rangeset: {
        code: 'user'
      },
      group: 'info'
    }

  }
}
module.exports = recruit
