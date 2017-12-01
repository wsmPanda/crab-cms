/**
 * 静化结构需求
 * 静化页面需要特殊写法同时定义静化页面配置才能生效
 * ##需要注意的点有
 * 多model页面
 * json数据导出限度
 * 上传文件处理
 * 静化结构与页面生成 
 */
;[{
  // 单页页面，渲染方式为直接调用controller渲染结果
  code: 'index',
  type: 'page'
}, {
  /*列表界面，将内容模板导出为前端模板，将指定model导出为静态的json数据
   后续需要加入对文件的支持 */
  code: 'article',
  model: ['article'],
  pages: true,
  type: 'list'
}, {
  
  code: 'article.detail',
  model: ['article'],
  type: 'detail'
}]
