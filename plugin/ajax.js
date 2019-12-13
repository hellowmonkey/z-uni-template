import Vue from 'vue'
import store from '../store'
import config from '../config'
import {
  isEmpty
} from '../utils'

const requests = {}

const ajax = (params = {}) => {
  params = Object.assign({
    method: 'GET',
    baseURL: config.baseURL,
    data: {},
    header: {},
    __errorHandle: true // 自动处理错误
  }, params)
  params.method = params.method.toLocaleUpperCase()
  if (!params.url) {
    return uni.showModal({
      title: '请求失败',
      content: '请求地址不能为空',
      showCancel: false
    })
  }
  if (!(/:\/\//.test(params.url) || /^\/\//.test(params.url))) {
    params.url = params.baseURL.replace(/\/$/, '') + '/' + params.url.replace(/^\//, '')
  }
  const {
    data
  } = params
  const query = {}
  for (const key in data) {
    let item = data[key]
    if (!isEmpty(item)) {
      if (typeof item === 'string') {
        item = item.trim()
      }
      query[key] = item
    }
  }
  delete data.__errorHandle
  delete data.baseURL
  return new Promise((resolve, reject) => {
    if (store.state.event.netWorkType === 'none') {
      uni.showToast({
        icon: 'none',
        title: '无网络连接'
      })
      return reject({
        message: '无网络连接'
      })
    }
    // 防抖处理
    if (!['GET', 'OPTIONS'].includes(params.method)) {
      const now = Date.now()
      if (requests[params.url] && now - requests[params.url] <= 500) {
        return resolve()
      }
      requests[params.url] = now
    }
    return uni.request({
      ...params,
      data: query,
      success({
        data
      }) {
        if (data.code !== config.successCode) {
          if (query.__errorHandle) {
            uni.showToast({
              icon: 'none',
              title: data.message
            })
          }
          return reject(data)
        }
        resolve(data)
      },
      fail(e) {
        uni.showModal({
          content: e.errMsg,
          title: '请求失败',
          showCancel: false
        })
        return reject(e)
      }
    })
  })
}

const methods = {};
['get', 'post', 'put', 'delete', 'head'].map(method => {
  methods[method] = (url, params = {}) => {
    params = Object.assign({
      data: params
    }, {
      url
    }, {
      method: method.toLocaleUpperCase()
    })
    return ajax(params)
  }
})

for (let key in methods) {
  ajax.prototype[`$${key}`] = methods[key]
}

Vue.prototype.$ajax = ajax
store.$ajax = ajax

export default ajax

uni.getNetworkType({
  success(networkType) {
    store.commit('event/setNetWorkType', networkType)
  }
})

uni.onNetworkStatusChange(({
  networkType
}) => {
  store.commit('event/setNetWorkType', networkType)
})
