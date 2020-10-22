import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/problems',
    name: 'problems',
    component: () => import('@/views/Problems')
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('@/views/Rank')
  },
  {
    path: '/contests',
    name: 'contests',
    component: () => import('@/views/Contests')
  },
  {
    path: '/gym',
    name: 'gym',
    component: () => import('@/views/Gym')
  },
]

const router = new VueRouter({
  routes
})

export default router
