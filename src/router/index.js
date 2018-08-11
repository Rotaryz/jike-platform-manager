import Vue from 'vue'
import Router from 'vue-router'

// const HelloWorld = () => import('pages/hello-world/hello-world')
const Home = () => import('pages/home/home')
const Login = () => import('pages/login/login')
const AgentManagement = () => import('pages/agent-management/agent-management') // 代理商管理列表
const BusinessManagement = () => import('pages/business-management/business-management') // 企业管理列表
const CustomerManagement = () => import('pages/customer-management/customer-management') // 客户管理列表

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: 'agent-management',
        component: AgentManagement,
        meta: {
          title: '商家管理,代理商管理'
        }
      }, {
        path: 'business-management',
        component: BusinessManagement,
        meta: {
          title: '商家管理,企业管理'
        }
      }, {
        path: 'customer-management',
        component: CustomerManagement,
        meta: {
          title: '商家管理,企业管理'
        }
      }]
    }, {
      path: '/login',
      component: Login
    }
  ]
})

route.beforeEach((to, from, next) => {
  // document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  // if (to.path === '/') {
  //   const token = storage.get('token', '')
  //   if (token) {
  //     next({path: DEFAULT_ROUTE, replace: true})
  //   } else {
  //     next({path: OAUTH_ROUTE, replace: true})
  //   }
  // }
  next()
})

export default route