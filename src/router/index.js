import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Classic',
      component: () => import('@/pages/classic/classic')
    }
  ]
})
