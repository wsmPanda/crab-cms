import Vue from 'vue'
import Router from 'vue-router'
import Dash from '@/pages/dash'
import List from '@/pages/list'
import Detail from '@/pages/detail'
import System from '@/pages/system'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dash',
      component: Dash
    },
    {
      path: '/page/index',
      name: 'page',
      component: System
    },
    {
      path: '/page/:code/list',
      name: 'page',
      component: List
    },
    {
      path: '/page/:code/detail',
      name: 'add',
      component: Detail
    },
    {
      path: '/page/:code/detail/:id',
      name: 'detail',
      component: Detail
    }
  ]
})
