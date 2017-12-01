import storeModule from 'mixins/storeModule'
import storeSubModule from 'mixins/storeSubModule'

export default {
  install(Vue, options) {
    // 绑定store内数据，传入字符为变量路径，类似v-model
    // 默认事件为input，默认值名称为value，调用的默认方法为setValue
    var _extend = Vue.extend
    // 扩展vue组件生成函数，加入自定义初始化
    Vue.extend = (options, ...arg) => {
      // 借用vue内部初始化标记 _Ctor 判断组件是否已经初始化
      // 需在原_extend之后调用，_extend中会为 _Ctor 赋值，之后则无法判断
      if (!options._StoreInit && (options.moduleStore || options.subModuleStore)) {
        // 为组件注入store相关方法和属性
        // TODO 添加判断，moduleStore基类是否重复引用 
        // TODO 将store扩展方法移至此处
        // TODO 添加 _form 绑定标注处理，为state的计算属性添加get和set值 
        options._StoreInit = true
        if (options.moduleStore && !options.subModuleStore) {
          if (!options.extends) {
            options.extends = storeModule
          } else {
            if (!options.mixins) {
              options.mixins = [storeModule]
            } else {
              // 使用unshift才能使默认基类最早调用
              options.mixins.unshift(storeModule)
            }
          }
        }
        if (options.subModuleStore) {
          if (!options.mixins) {
            options.mixins = [storeSubModule]
          } else {
            options.mixins.unshift(storeSubModule)
          }
        }
      }
      var component = _extend.call(Vue, options, ...arg)

      return component
    }

    Vue.directive('focus', {
      inserted: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    })
  }
}
