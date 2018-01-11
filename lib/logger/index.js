var log4js = require('log4js')
log4js.configure({
  appenders: [{
    type: 'DateFile',
    pattern: 'yyyy-MM-dd.log',
    filename: 'log/access/',
    alwaysIncludePattern: true,
    category: 'access'
  }, {
    type: 'DateFile',
    pattern: 'yyyy-MM-dd.log',
    filename: 'log/sql/',
    alwaysIncludePattern: true,
    category: 'sql'
  }]
})
var logger = log4js.getLogger('access')
var wrapper = x => `"${x}"`
module.exports = async function (ctx, next) {
  logger.info(wrapper(ctx.path), wrapper(ctx.accept.headers.referer), wrapper(ctx.accept.headers['user-agent']), wrapper(ctx.ip.match(/\d+.\d+.\d+.\d+/)))
  await next()
}
