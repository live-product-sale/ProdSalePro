import config from '../config/index.config.js'
import { msg } from './index.js'

function fetch(options) {
	const token = uni.getStorageSync('token') || ""
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`
	}
	return new Promise((resolve, reject) => {
		console.log(config.baseURL + options.url)
		uni.request({
			url: config.baseURL + options.url,
			header: headers,
			method: options.method,
			data: options.data || null,
			success:(res) => {
				const result = res.data
				if(result.code === "000004") {
					msg('您未登陆, 请先登陆')
				} else if(result.code !== "000000") {
					msg('错误码:'+result.code)
				}
				resolve(result)
				},
			fail: (err) => { reject(err)}
		})
	}) 
}

export default {
	GET(url, data = {}) {
		return fetch({url, data, method: 'GET'})
	},
	POST(url, data = {}) {
		return fetch({url, data, method: 'POST'})
	}
}