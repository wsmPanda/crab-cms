var Comment = {
  code: 'comment',
  name: '评论',
  fields: {
    content: {
      name: '内容',
      type: 'text',
      requred: true
    },
    article_id: {
      name: '文章',
      type: 'ref',
      requred: true,
      rangeset: {
        code: 'article'
      }
    },
    email: {
      name: '邮箱',
      type: 'code'
    },
    author: {
      name: '作者',
      type: 'code'
    }
  }
}

module.exports = Comment
