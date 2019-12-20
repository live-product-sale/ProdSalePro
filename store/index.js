import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 获取本地token ,如果不存在则为空
const TOKEN = uni.getStorageSync('token') || ''
// 获取用户信息
const USERINFO = uni.getStorageSync('userinfo') || {}

// 状态管理
const store  = new Vuex.Store({
	state:{
		token: TOKEN
	}
})

export default store