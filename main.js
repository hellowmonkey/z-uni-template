import Vue from 'vue'
import App from './App'

import store from './store'

import Button from './components/libs/Button'

import './filter'
import './mixin'
import './plugin/ajax'
import './plugin/dayjs'

Vue.component('ZButton', Button)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
