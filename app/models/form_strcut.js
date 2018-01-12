var form_struct = {
  code: 'form_struct', // custom_struct
  name: '表单定义',
  relate: [{
    code: 'form_data',
    name: '表单数据',
    type: 'sub',
    key: 'struct_id',
    main_key: 'code'
  }],
  group: {
    right: {
      locate: 'right',
      span: 12
    },
    default: {
      span: 12
    }
  },
  fields: {
    code: {
      name: '编码',
      type: 'code',
      requred: false
    },
    name: {
      name: '名称',
      type: 'name',
      requred: true
    },
    type: {
      name: '类型',
      type: 'code'
    },
    memo: {
      name: '描述',
      type: 'memo'
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
  },
  slaves: {
    fields: {
      name: '表单字段',
      group: 'right',
      fields: {
        code: {
          name: '编码',
          type: 'code',
          required: true
        },
        name: {
          name: '名称',
          type: 'code',
          required: true
        },
        type: {
          name: '类型',
          type: 'code'
        },
        tip: {
          name: '输入提示',
          type: 'code'
        },
        required: {
          name: '必填',
          type: 'bool'
        },
        editable: {
          name: '可编辑',
          type: 'bool'
        },
        listpos: {
          name: '列表顺序',
          type: 'integer'
        },
        cardpos: {
          name: '表单顺序',
          type: 'integer'
        },
        dispaly: {
          name: '控件',
          type: 'code'
        },
        locate: {
          name: '',
          type: 'code'
        }
      }
    }
  }
}
module.exports = form_struct
