import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

// const HelloWorld = () => import('pages/hello-world/hello-world')
const Home = () => import('pages/home/home')
const Login = () => import('pages/login/login')
const AgentManagement = () => import('pages/agent-management/agent-management') // 代理商管理列表
const AgentList = () => import('pages/agent-list/agent-list') // 代理商管理列表
const BusinessManagement = () => import('pages/business-management/business-management') // 企业管理列表
const BusinessDetail = () => import('pages/business-detail/business-detail') // 企业管理详情
const BusinessList = () => import('pages/business-list/business-list') // 企业管理列表
const CustomerManagement = () => import('pages/customer-management/customer-management') // 客户管理列表
const AgentOrder = () => import('pages/agent-order/agent-order') // 代理订单
const RetailOrder = () => import('pages/retail-order/retail-order') // 零售订单
const PlatformIncome = () => import('pages/platform-income/platform-income') // 平台收入
const PlatformExpend = () => import('pages/platform-expend/platform-expend') // 平台支出
const CashManagement = () => import('pages/cash-management/cash-management') // 提现管理
const RoleManagement = () => import('pages/role-management/role-management') // 角色管理
const NewAgent = () => import('pages/new-agent/new-agent') // 代理商管理新增编辑
const AgentDetail = () => import('pages/agent-detail/agent-detail') // 代理商管理查看
const AddOrder = () => import('pages/add-order/add-order') // 代理商管理查看
const OrderManagement = () => import('pages/order-management/order-management') // 订单管理
const AgentOrderDetail = () => import('pages/agentOrder-detail/agentOrder-detail') // 代理订单详情
const RetailOrderDetail = () => import('pages/retailOrder-detail/retailOrder-detail') // 代理订单详情
const MemberManagement = () => import('pages/member-management/member-management') // 成员管理
const MemberList = () => import('pages/member-list/member-list') // 成员管理列表
const MemberDetail = () => import('pages/member-detail/member-detail') // 成员管理列表
const RoleList = () => import('pages/role-list/role-list') // 角色设置
const NewRole = () => import('pages/new-role/new-role') // 角色设置
const FinancialManagement = () => import('pages/financial-management/financial-management') // 财务管理

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: 'agent-management',
        component: AgentManagement,
        children: [{
          path: 'agent-list',
          component: AgentList,
          meta: {
            title: '商家管理,代理商管理'
          }
        }, {
          path: 'agent-list/new-agent',
          component: NewAgent,
          meta: {
            title: '商家管理,代理商管理,新增代理商'
          }
        }, {
          path: 'agent-list/agent-detail',
          component: AgentDetail,
          meta: {
            title: '商家管理,代理商管理'
          }
        }]
      }, {
        path: 'business-management',
        component: BusinessManagement,
        meta: {
          title: '商家管理,企业管理'
        },
        children: [{
          path: 'business-list',
          component: BusinessList,
          meta: {
            title: '商家管理,企业管理'
          }
        }, {
          path: 'business-list/business-detail',
          component: BusinessDetail,
          meta: {
            title: '商家管理,企业管理'
          }
        }]
      }, {
        path: 'customer-management',
        component: CustomerManagement,
        meta: {
          title: '商家管理,企业管理'
        }
      }, {
        path: 'order-management',
        component: OrderManagement,
        redirect: 'order-management/agent-order',
        children: [
          {
            path: 'agent-order',
            component: AgentOrder,
            meta: {
              title: '订单管理,代理订单'
            }
          }, {
            path: 'retail-order',
            component: RetailOrder,
            meta: {
              title: '订单管理,零售订单'
            }
          }, {
            path: 'add-order',
            component: AddOrder,
            meta: {
              title: '订单管理,代理订单,新增订单'
            }
          }, {
            path: 'agentOrder-detail',
            component: AgentOrderDetail,
            meta: {
              title: '订单管理,代理订单,查看详情'
            }
          }, {
            path: 'retailOrder-detail',
            component: RetailOrderDetail,
            meta: {
              title: '订单管理,零售订单,查看详情'
            }
          }
        ]
      }, {
        path: 'financial-management',
        component: FinancialManagement,
        redirect: 'financial-management/platform-income',
        children: [
          {
            path: 'platform-income',
            component: PlatformIncome,
            meta: {
              title: '财务管理,平台收入'
            }
          }, {
            path: 'platform-expend',
            component: PlatformExpend,
            meta: {
              title: '财务管理,平台支出'
            }
          }, {
            path: 'cash-management',
            component: CashManagement,
            meta: {
              title: '财务管理,提现管理'
            }
          }
        ]
      }, {
        path: 'role-management',
        component: RoleManagement,
        meta: {
          title: '基础设置,角色设置'
        },
        children: [{
          path: 'role-list',
          component: RoleList,
          meta: {
            title: '基础设置,角色设置'
          }
        }, {
          path: 'new-role',
          component: NewRole,
          meta: {
            title: '基础设置,角色设置'
          }
        }]
      }, {
        path: 'member-management',
        component: MemberManagement,
        meta: {
          title: '商家管理,成员管理'
        },
        children: [{
          path: 'member-list',
          component: MemberList,
          meta: {
            title: '商家管理,成员管理'
          }
        }, {
          path: 'member-list/member-detail',
          component: MemberDetail,
          meta: {
            title: '商家管理,成员管理'
          }
        }]
      }]
    }, {
      path: '/login',
      component: Login
    }
  ]
})
const DEFAULT_ROUTE = '/agent-management/agent-list'
const OAUTH_ROUTE = '/login'
route.beforeEach((to, from, next) => {
  if (to.path === '/') {
    const token = storage.get('aiToken', '')
    if (token) {
      next({path: DEFAULT_ROUTE, replace: true})
    } else {
      next({path: OAUTH_ROUTE, replace: true})
    }
  }
  next()
})
export default route
