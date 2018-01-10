var log4js = require('log4js')
log4js.configure({
  appenders: [{
    type: 'DateFile',
    pattern: '_yyyy-MM-dd.log',
    filename: 'log/access',
    alwaysIncludePattern: true,
    category: 'access'
  }]
})
var logger = log4js.getLogger('access')
var wrapper = x => `"${x}"`
module.exports = async function (ctx, next) {
  logger.info(wrapper(ctx.path), wrapper(ctx.accept.headers.referer), wrapper(ctx.accept.headers['user-agent']))
  await next()
}
