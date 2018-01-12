const Crab = require('@crab')
const Controller = require('../controller')

module.exports = async(ctx, next) => {
  //通过section对象改变页面tdk
  var arr = ctx.path.split('/')
  var active = arr[1]
  ctx.section = await Controller.page.data(active)
  await next()
}
