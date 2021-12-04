import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/Home')
    },
    {
        path: '/problems',
        name: 'problems',
        component: () => import('../views/problem/Problems')
    },
    {
        path: '/rank',
        name: 'rank',
        component: () => import('../views/rank/Rank')
    },
    {
        path: '/user/:username',
        name: 'user',
        component: () => import('../views/user/User')
    },
    {
        path: '/contests',
        name: 'contests',
        component: () => import('../views/contest/Contests')
    },
    {
        path: '/gym',
        name: 'gym',
        component: () => import('../views/gym/Gym')
    },
    {
        path: '/status',
        name: 'status',
        component: () => import('../views/status/Status')
    },
    {
        path: '/system',
        name: 'system',
        component: () => import('../views/system/System')
    },
    {
        path: '/FAQ',
        name: 'FAQ',
        component: () => import('../views/system/FAQ')
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
        }, {
            path: 'description',
            name: 'problem_display',
            component: () => import('../views/problem/Description')
        }, {
            path: 'submit',
            name: 'problem_submit',
            component: () => import('../views/problem/Submit')
        }, {
            path: 'status/:username',
            name: 'problem_my',
            component: () => import('../views/status/Status')
        }, {
            path: 'status',
            name: 'problem_status',
            component: () => import('../views/status/Status')
        },]
    },
    {
        path: '/contest/:contestId',
        name: 'contest',
        component: () => import('../views/contest/Contest'),
        children: [{
            path: 'problem/:problemId',
            name: 'contest_problem_display',
            component: () => import('../views/problem/Description')
        }, {
            path: 'submit/:problemId',
            name: 'contest_solution_submit',
            component: () => import('../views/problem/Submit')
        }, {
            path: 'problems',
            name: 'contest_problems',
            component: () => import('../views/contest/Problems')
        }, {
            path: 'status',
            name: 'contest_status',
            component: () => import('../views/status/Status')
        }, {
            path: 'status/:username',
            name: 'contest_my',
            component: () => import('../views/status/Status')
        }, {
            path: 'standings',
            name: 'contest_standings',
            component: () => import('../components/contest/contest-standings')
        },]
    },

    /// SSO
    {
        name: 'ssoCallback',
        path: '/ssoCallback',
        component: () => import('@/views/sso/sso-login-callback'),
        meta: {
            title: '单点登录跳转 - viewOJ'
        }
    },


    /// admin
    {
        path: '/admin',
        component: () => import('../views/_/EmptyView'),
        children: [
            {
                path: "",
                name: 'admin',
                component: () => import('../views/admin/Admin')
            },
            {
                path: "feedback",
                name: 'admin_feedback',
                component: () => import('../views/admin/Feedback')
            },
            {
                path: "problem",
                component: () => import('../views/_/EmptyView'),
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
            {
                path: "news",
                name: 'admin_news',
                component: () => import('../views/admin/home/News'),
            },
            {
                path: "contest",
                component: () => import('../views/_/EmptyView'),
                children: [
                    {
                        path: 'new',
                        name: 'admin_contest_new',
                        component: () => import('../views/admin/contest/NewContest')
                    },
                    {
                        path: 'edit',
                        name: 'admin_contest_edit',
                        component: () => import('../views/admin/contest/EditContest')
                    },
                    {
                        path: 'data',
                        name: 'admin_contest_data',
                        component: () => import('../views/admin/contest/Data')
                    }
                ]
            },
            {
                path: "user",
                component: () => import('../views/_/EmptyView'),
                children: [
                    {
                        path: 'manage',
                        name: 'admin_user_manage',
                        component: () => import('../views/admin/user/Manage')
                    },
                    {
                        path: 'password',
                        name: 'admin_user_password',
                        component: () => import('../views/admin/user/Password')
                    },
                    {
                        path: 'permission',
                        name: 'admin_user_permission',
                        component: () => import('../views/admin/user/Permission')
                    },
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
        path: '/refresh',
        name: 'refresh',
        component: () => import('../views/_/Refresh')
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
