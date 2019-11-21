import Vue from 'vue'
import App from './App'

import store from './store'

import Button from './components/libs/Button'
import Tag from './components/libs/Tag'

import './filter'
import './mixin'
import './plugin/ajax'
import './plugin/dayjs'

Vue.component('ZButton', Button)
Vue.component('ZTag', Tag)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()
