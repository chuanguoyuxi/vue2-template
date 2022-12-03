import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/user/login',
    component: () => import('@/views/user/login')
  }
]

export const asyncRouterMap = [
  {
    path: '/home',
    component: () => import('@/views/home/index')
  }
]

const createRouter = () =>
  new VueRouter({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }), // history 模式下使用
    routes: constantRouterMap
  })

const router = createRouter()

// 定义一个resetRouter 方法，在退出登录后或token过期后 需要重新登录时，调用即可
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
