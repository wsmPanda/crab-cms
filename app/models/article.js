var Article = {
  code: 'article',
  name: '新闻文章',
  layout: 'panel',
  relate: [{
    code: 'comment',
    name: '文章评论',
    type: 'sub',
    key: 'article_id'
  }],
  actions: [{
    type: 'process',
    name: '重新发布',
    icon: 'refresh',
    path: 'admin/service/staticize/article'
  }],
  groups: {
    info: {
      name: '基本信息',
      locate: 'right'
    },
    page_setting: {
      name: '页面设置',
      locate: 'right'
    }
  },
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
      requred: true,
      group: 'info'
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
      requred: true,
      group: 'info'
    },
    href: {
      name: '自定义链接',
      type: 'url',
      group: 'page_setting',
      list_pos: 0
    },
    view_count: {
      name: '点击量',
      type: 'integer',
      default: 0,
      card_pos: 0
    },
    tags: {
      name: '标签',
      type: 'refs',
      rangeset: {
        code: 'tag',
        name_record: true
      },
      editor: 'modal',
      group: 'info'
    },
    tag_title: {
      name: '页面标题',
      type: 'code',
      group: 'page_setting',
      tip: '默认为文章标题',
      list_pos: 0
    },
    tag_description: {
      name: '页面描述',
      type: 'code',
      group: 'page_setting',
      list_pos: 0
    },
    tag_key: {
      name: '关键字',
      tip: '使用;分割关键字',
      type: 'code',
      group: 'page_setting',
      list_pos: 0
    },
    enable_share: {
      name: '允许分享',
      type: 'bool',
      default: true,
      list_pos: 0
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
module.exports = Article
