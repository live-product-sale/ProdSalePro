import config from '../config/index.config.js'

const token = uni.getStorageSync('token') || ""

function fetch(options) {
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
				console.log(result)
				if(result.data && result.data.token) {
					uni.setStorageSync('token', result.data.token)
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
	},
	POSTformdata(url, data = {}) {
		return fetch({url, data, method: 'POST'})
	}
}