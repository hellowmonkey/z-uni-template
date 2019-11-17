export default {
	namespaced: true,
	state: {
		netWorkType: null,
		systemInfo: {}
	},
	mutations: {
		setNetWorkType(state, data) {
			state.netWorkType = String(data)
		},
		setSystemInfo(state, data) {
			state.systemInfo = data
		}
	},
	actions: {}
}
