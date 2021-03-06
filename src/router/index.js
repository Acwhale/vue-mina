import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Classic',
      component: () => import('@/pages/classic/classic')
    },
    {
      path: '/book',
      name: 'Book',
      component: () => import('@/pages/book/book')
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('@/pages/my/my')
    },
    {
      path : '/bookDetail/:id',
      name : 'BookDetail',
      component: ()=> import('@/pages/bookDetail/bookDetail')
    }
  ]
})
