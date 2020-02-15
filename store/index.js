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
		 // 全局变量定义处
		hasLogin: false,          // 用户是否登陆
		token: TOKEN,             // token
		userInfo: {}              // 用户信息
	},
	mutations: {
		// 全局方法定义处
		login(state, provider) {
			state.hasLogin = true
			state.userInfo = provider
			uni.setStorage({
				key: "userInfo",
				data: provider
			})
			console.log('userinfo', provider)
		},
		logout(state) {
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: "userInfo"
			})
		}
	},
	actions: {
		
	},
})

export default store