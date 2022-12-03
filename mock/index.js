const Mock = require('mockjs')
const { param2Obj } = require('./utils')

// https://webpack.js.org/guides/dependency-management/#requirecontext
const servicesFiles = require.context('./services', true, /\.js$/)

// you do not need `import user from './services/user'`
const services = servicesFiles.keys().reduce((services, servicePath) => {
  // set './app.js' => 'app'
  const servicesName = servicePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = servicesFiles(servicePath)
  services[servicesName] = value.default
  return services
}, {})

// for front mock
// 请谨慎使用，它将重新定义XMLHttpRequest，这将导致许多第三方库无效（如progress事件）
function mockXHR () {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap (respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of services) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  services,
  mockXHR
}
