import Vue from 'vue'
import store from '../store'
import config from '../config'
import {
	isEmpty
} from '../utils'

const ajax = (params = {}) => {
	params = Object.assign({
		method: 'GET',
		baseURL: config.baseURL,
		data: {},
		header: {
		},
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
	const data = JSON.parse(JSON.stringify(params))
	const query = data.data
	for (let key in query) {
		const item = query[key]
		if (isEmpty(item)) delete data.data[key]
	}
	delete data.data.__errorHandle
	delete data.data.baseURL
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
		return uni.request({
			...data,
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
	Vue.prototype[`$${key}`] = methods[key]
	store[`$${key}`] = methods[key]
}

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
