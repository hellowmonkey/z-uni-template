import Vue from 'vue'
import store from '../store'

const toast = (message = '') => {
  uni.showToast({
    title: message,
    icon: 'none',
    position: 'bottom',
    duration: 2000
  });
}

const success = (message = '') => {
  uni.showToast({
    title: message,
    icon: 'success',
    position: 'center',
    duration: 3000
  });
}

const loading = (message = '') => {
  uni.showLoading({
    title: message,
    mask: true
  });
  return uni.hideLoading
}

const modal = (opts = {}) => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      ...opts,
      success(res) {
        if (res.confirm) {
          return resolve()
        }
        return reject()
      },
      fail(e) {
        return reject(e)
      }
    });
  })
}

const alert = (title, content = '', confirmText = '确认') => {
  return modal({
    title,
    content,
    confirmText,
    showCancel: false
  })
}

const confirm = (title, content = '', confirmText = '确认', cancelText = '取消') => {
  return modal({
    title,
    content,
    confirmText,
    cancelText
  })
}

const actionSheet = (itemList = []) => {
  return new Promise((resolve, reject) => {
    uni.showActionSheet({
      itemList,
      success({
        tapIndex
      }) {
        resolve(tapIndex)
      },
      fail(e) {
        reject(e)
      }
    });
  })
}

Vue.prototype.$toast = toast
Vue.prototype.$success = success
Vue.prototype.$loading = loading
Vue.prototype.$modal = modal
Vue.prototype.$alert = alert
Vue.prototype.$confirm = confirm
Vue.prototype.$actionSheet = actionSheet

store.$toast = toast
store.$success = success
store.$loading = loading
store.$modal = modal
store.$alert = alert
store.$confirm = confirm
store.$actionSheet = actionSheet
