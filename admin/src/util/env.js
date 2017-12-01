/*
执行环境设置 通过，meta进行判断
*/
import { metaContent } from 'util'
var envConfig = {
  test: {
    name: '测试环境',
    icon: 'erlenmeyer-flask'
  },
  dev: { 
    name: '开发环境',
    icon: 'erlenmeyer-flask',
    dev: true
  }
}
var env = metaContent('ENV') || 'prod'
var config = envConfig[env] || {}
export default config
