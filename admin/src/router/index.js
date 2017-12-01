import Vue from 'vue'
import Router from 'vue-router'
import Dash from '@/pages/dash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dash',
      component: Dash
    }
  ]
})
