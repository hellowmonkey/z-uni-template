import Vue from 'vue'
import Vuex from 'vuex'

import event from './modules/event'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		event
	}
})

Vue.prototype.$store = store

export default store
