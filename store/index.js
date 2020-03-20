import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const Info = uni.getStorageSync('Info') || ''
const Token = uni.getStorageSync("token") || ''
const hasLogin = uni.getStorageSync("hasLogin") || false
// 状态管理
const store  = new Vuex.Store({
	state:{
		hasLogin: hasLogin,          // 用户是否登陆
		info: Info,
		token: Token
	},
	mutations: {
		/** 
		 * 设置登陆状态
		 * */
		setLoginState(state, provider) {
			uni.setStorageSync("token", provider.token)
			uni.setStorageSync("Info", provider.userinfo)
			uni.setStorageSync("hasLogin", true)
			state.hasLogin = true
			state.info = provider.userinfo
			state.token = provider.token
			// console.log('userinfo', provider)
		},
		/**
		 * 设置退出状态
		 * */
		setLogoutState(state) {
			// console.log(state)
			state.hasLogin = false
			state.info = {}
			state.token = ""
			uni.clearStorageSync()	
		}
	},
	actions: {
		
	},
})

export default store