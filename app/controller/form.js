const Crab = require('@crab')
const Form = Crab.model('form_struct')
const Data = Crab.model('form_data')
const Time = require('@util/time')
const controller = {
  async put(ctx) {
    await Data.save({
      struct_id: ctx.params.code,
      content: JSON.stringify(ctx.request.body),
      create_time: Time.toTime(Date.parse(new Date()))
    })
    await ctx.render('form_submit')
  }
}
module.exports = controller
