const importer = require('@util/importer')
var Controller = importer(__dirname)('./')
for (let i in Controller) {
  for (let code in Controller[i]) {
    var item = Controller[i][code]
    if (typeof item !== 'function') {
      if (item.template) {
        Controller[i][code] = pageRender(item)
      } else {
        Controller[i][code] = item.data
      }
    }
  }
}

function pageRender(item) {
  return async(ctx) => {
    var data = await item.data(ctx)
    await ctx.render(item.template, {
      data
    })
  }
}
/*
controller 格式
{
    //通过render渲染数据 直接设置方法，则视为直接返回该数据或直接执行
    name:{
        //设置渲染模板，不设值则直接返回json数据
        tempalte:'templateCode'
        //数据返回
        async data(){}
    }
}
*/
module.exports = Controller
