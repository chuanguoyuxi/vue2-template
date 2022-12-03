import router, { resetRouter } from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // no redirect whitelist
const loginRoutePath = '/user/login'
const defaultRoutePath = '/home'
const lockRoutePath = '/'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  //   to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {
    if (store.getters.isLock && to.path !== lockRoutePath) {
      // 如果系统激活锁屏，全部跳转到锁屏页
      next({ path: lockRoutePath })
    } else if (to.path === loginRoutePath) {
      // 如果已登录，请重定向到主页
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            // 根据用户权限信息生成可访问的路由表
            store.dispatch('GenerateRoutes', { hasToken, ...res }).then(() => {
              // 动态添加可访问路由表
              resetRouter() // 重置路由 防止退出重新登录或者 token 过期后页面未刷新，导致的路由重复添加
              store.getters.addRouters.forEach(r => {
                router.addRoute(r)
              })
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // 设置replace:true，这样导航就不会留下历史记录
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            // 提示 请求用户信息失败，请重试
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
            NProgress.done()
          })
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录名单，直接进入
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面.
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // 如果当前页面为登录，则在每个钩子后都不会触发登录，因此请手动处理
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
