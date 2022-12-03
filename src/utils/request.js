import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL, // url = base url + request url
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = getToken()
    if (error.response.status === 500) {
      // tishi
    }
    if (error.response.status === 404) {
      // tishi
    }
    if (error.response.status === 403) {
      // tishi
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      // tishi
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = store.getters.token
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
    // config.headers['Content-Type'] = 'application/json; charset=utf-8'
  }
  // headers中配置serialize为true开启序列化
  //   if (config.method === 'post' && meta.isSerialize === true) {
  //     config.data = serialize(config.data)
  //   }
  //   if (config.params) {
  //     config.params = filterParams(config.params)
  //   }
  if (config.data) {
    if (config.data instanceof FormData) {
      return config
    }
    if (config.data instanceof Array) {
      return config
    }
    // config.data = filterParams(config.data)
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(
  /**
   *如果您想获取http信息，如标题或状态
   *请返回响应=>响应
  */

  /**
   *通过自定义代码确定请求状态
   *这里只是一个例子
   *您还可以通过HTTP状态代码来判断状态
  */
  response => {
    if (response.headers['new-token']) {
      store.commit('user/setToken', response.headers['new-token'])
    }
    if (response.data.code === 0 || response.headers.success === 'true') {
      if (response.headers.msg) {
        response.data.msg = decodeURI(response.headers.msg)
      }
      return response.data
    } else {
    //   提示
      if (response.data.data && response.data.data.reload) {
        store.commit('user/LoginOut')
      }
      return response.data.msg ? response.data : response
    }
  }, errorHandler)

export default request
