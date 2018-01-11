const Crab = require('@crab')

module.exports = async(ctx, next) => {
  var page = ctx.section.page
  //注入关联内容
  if (page && page.relate_type) {
    var Model = Crab.model(page.relate_type)
    if (Model) {
      if (!page.relate_code && page.relate_code !== 0) {
        ctx.section.content = await Model.list()
      } else {
        ctx.section.content = await Model.find({
          code: page.relate_code
        })
      }
    }
  }
  console.log(ctx.section.content)
  await next()
}
