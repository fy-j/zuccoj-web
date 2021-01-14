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
    path: '/solution/:solutionId',
    name: 'solution',
    component: () => import('../views/solution/Solution')
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


  /// admin
  {
    path: '/admin',
    component: () => import('../views/EmptyView'),
    children: [
      {
        path: "",
        name: 'admin',
        component: () => import('../views/Admin')
      },
      {
        path: "problem",
        component: () => import('../views/EmptyView'),
        children: [
          {
            path: 'new',
            name: 'admin_problem_new',
            component: () => import('../views/admin/problem/NewProblem')
          },
          {
            path: 'edit',
            name: 'admin_problem_edit',
            component: () => import('../views/admin/problem/EditProblem')
          },
          {
            path: 'data',
            name: 'admin_problem_data',
            component: () => import('../views/admin/problem/Data')
          }
        ]
      },
    ]
  },

  /// error
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
