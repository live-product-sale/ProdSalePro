import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import * as $apis from './apis/index.js'



Vue.prototype.$store = store
Vue.prototype.$apis = $apis


// 注册全局组件

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
