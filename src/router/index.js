import Vue from 'vue'
import Router from 'vue-router'

// const HelloWorld = () => import('pages/hello-world/hello-world')
const Home = () => import('pages/home/home')

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      component: Home
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