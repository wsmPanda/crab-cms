var Article = {
  code: 'article',
  name: '文章',
  relate: [{
    code: 'comment',
    name: '文章评论',
    type: 'sub',
    key: 'article_id'
  }, {
    code: 'tag',
    name: '文章标签',
    type: 'bridge'
  }],
  fields: {
    title: {
      name: '标题',
      type: 'code',
      requred: true
    },
    create_time: {
      name: '创建时间',
      type: 'datetime',
      default: '@now',
      requred: true
    },
    brief: {
      name: '简述',
      type: 'code'
    },
    content: {
      name: '内容',
      type: 'html',
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
