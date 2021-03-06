var User = {
  code: 'user',
  fields: {
    account: {
      name: '账号',
      type: 'code',
      requred: true
    },
    name: {
      name: '名称',
      type: 'name',
      requred: true
    },
    password: {
      name: '密码',
      type: 'password',
      requred: true
    },
    role: {
      name: '角色',
      type: 'string',
      requred: true
    },
    state: {
      name: '状态',
      type: 'select',
      default: '0',
      rangeset: {
        1: '正常',
        0: '封存'
      },
      requred: true
    }
  }
}
module.exports = User
