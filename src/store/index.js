import Vue from 'vue'
import Vuex from 'vuex'

// import app from './modules/app'

import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// 你不需要 `import app from './modules/app'`
// 它将自动要求模块文件中的所有vuex模块
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  state: {
  },
  //   getters: {
  //   },
  getters,
  mutations: {
  },
  actions: {
  },
  //   modules: {
  // 手动引入
  //     app,
  //     user,
  //     permission
  //   },
  modules
})

export default store
