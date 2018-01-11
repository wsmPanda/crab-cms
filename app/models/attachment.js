var Article = {
  code: 'attachment',
  name: '附件',
  type: 'img',
  fields: {
    name: {
      name: '文件名',
      type: 'code',
      requred: true
    },
    tags: {
      name: '标签',
      type: 'refs',
      rangeset: {
        code: 'attachment_tag',
        name_record: true
      },
      editor: 'modal',
      group: 'info'
    },
    create_time: {
      name: '创建时间',
      type: 'datetime',
      default: '@now',
      requred: true
    },
    path: {
      name: '文件',
      type: 'file',
      mapping: {
        name: 'name',
        size: 'size',
        type: 'type'
      }
    },
    type: {
      name: '文件类型',
      type: 'code'
    },
    size: {
      name: '文件大小',
      type: 'integer',
      default: 0
    },
    author: {
      name: '作者',
      type: 'ref',
      rangeset: {
        code: 'model'
      }
    }
  }
}
module.exports = Article
