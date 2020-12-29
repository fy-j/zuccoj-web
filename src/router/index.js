import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home')
  },
  {
    path: '/problems',
    name: 'problems',
    component: () => import('../views/Problems')
  },
  {
    path: '/problem/:problemId',
    name: 'problem',
    component: () => import('../views/problem/Problem'),
    children: [{
      path: '',
      redirect: 'description'
    },{
      path: 'description',
      component: () => import('../views/problem/Description')
    },{
      path: 'submit',
      component: () => import('../views/problem/Submit')
    }]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import('../views/Rank')
  },
  {
    path: '/contests',
    name: 'contests',
    component: () => import('../views/Contests')
  },
  {
    path: '/contest/:contestId',
    name: 'contest',
    component: () => import('../views/contest/Contest'),
    children: [{
      path: 'problems',
      component: () => import('../views/contest/Problems')
    },{
      path: 'status',
      component: () => import('../views/Status')
    },{
      path: 'my',
      component: () => import('../components/contest/contest-my-submit')
    },{
      path: 'standings',
      component: () => import('../components/contest/contest-standings')
    },]
  },
  {
    path: '/gym',
    name: 'gym',
    component: () => import('../views/Gym')
  },
  {
    path: '/status',
    name: 'status',
    component: () => import('../views/Status')
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('../views/System')
  },
  {
    path: '/data',
    name: 'data',
    component: () => import('../views/admin/Data')
  },
  {
    path: '/newProblem',
    name: 'new_problem',
    component: () => import('../views/admin/NewProblem')
  },
  {
    path: '/solution/:solutionId',
    name: 'solution',
    component: () => import('../views/solution/Solution')
  },
  {
    path: '/error/:code',
    name: 'error',
    component: () => import('../views/error/Error')
  },
  {
    path: '*',
    redirect: '/error/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
