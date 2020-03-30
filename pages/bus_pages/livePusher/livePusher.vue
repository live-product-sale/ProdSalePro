<template>
	 <view id="pusher"></view>
</template>

<script>
	export default {
		data() {
			return {
				live_id: '',
				pusher: null,                // 推流对象
				currentWebView: "",          // 视图容器
				pushObj: {
					livepushurl: '',         //推流地址,暂时用于测试
					whiteness: '3',          // 美白等级 
				}
			}
		},
		onLoad(data) {
			this.live_id = data.live_id
			this.init()
		},
		methods: {
			/**
			 * 页面初始化
			 * */
			async init() {
			  this.subscribeMsg(this.live_id)
			  await this.getLiveById(this.live_id)
			  this.monitor()
			  this.getSubView()	
			  this.getWebView()
			  
			},
			/**
			 * 创建推流对象
			 */
			createPush() {
				console.log(this.pushObj.livepushurl)
				const styles = {
					'width': '100%',                                             // 设备宽度
					'height': '100%',                                            // 设备高度
					'position': 'static',                                        // 视频布局模式
					'aspect': '480:960',
					'top': 0,                                                    // 距离头部0px
					'left': 0,                                                   // 距设备左边像素
					'auto-focus': true,                                          // 是否开启自动聚焦
					'beauty': 1,                                                 // 是否开启美颜
					'whiteness': this.pushObj.whiteness,                         // 0, 1,2,3,4,5  0 不使用美白， 值越大，美白效果越好
					'mode': "FHD",                                                 // 推流视频模式 ，SD标清， HD高清， FHD 超清
					'url': this.pushObj.livepushurl ,                            // 推流地址
				}
			    // #ifdef APP-PLUS
				this.pusher = new plus.video.LivePusher("pusher", styles)
				// #endif
			    // 将创建的对象 添加到 currentWebView
				this.currentWebview.append(this.pusher)
				// 监听状态事件变化)
				this.pusher.addEventListener('statechange', (e) => {
					console.log('statechange: '+JSON.stringify(e));
				}, false)
			},
			/**
			 * 获取当前视图对象
			 */
	        getWebView() {
				const pages = getCurrentPages()                            //获取当前 Webview 窗口对象
				const currentPage = pages[pages.length -1]
				// #ifdef APP-PLUS
				const webview = currentPage.$getAppWebview()
				this.currentWebview = webview
				// #endif
				this.createPush()                                          // 创建推流对象
			}, 
			/**
			 * 获取当前子窗口
			 */
			getSubView() {
				const pushHeader = uni.getSubNVueById("header")
				pushHeader.hide()
				const pushBarrage = uni.getSubNVueById("barrage")	
				pushBarrage.show()
				const pushFooter = uni.getSubNVueById("footer")
				pushFooter.show()
			},
			/**
			 * 监听窗体消息
			 * */
			monitor() {
				uni.$on("startStatus", (res) => {
					console.log(res.value)
					if(res.value) {
						this.startLiveById()
					} else {
						this.endLiveById()
					}
					
				})
			},
			/**
			 * 获取直播信息根据直播ID
			 * **/
			 async getLiveById(id) {
				 const result = await this.$apis.getLiveById({ live_id: id})
				 this.pushObj.livepushurl = result.data.live_push
			 },
			 /**
			  * 开始直播
			  * @param {string} id 
			  * @param {boolean} status 
			  * */
			 async startLiveById() {
				 const data = { live_id: this.live_id, status: true }
				 const result = await this.$apis.startById(data)
				 console.log(result)
				 if(result.code === "000000") {
					 this.pusher.start(function() {
						 uni.showToast({
						 	title: '开始直播',
						 })
					 }, function(err) {
						  console.log('false',err)
					 })	
				 }
			 },
			 /**
			  * 暂停或继续直播
			  * @param {string} id
			  * @param {boolean} status  
			  * */
			  async pauseOrResume(id, status) {
				  const result = await this.$apis.startById({ live_id: id, status: status })
				  if(result.code === "000000" ) {
					  this.pusherPause()
				  } else if(result.code === "000000" && !status) {
					  this.pusherResume()
				  }
			  },
			  /**
			   * 结束直播
			   * */
			   async endLiveById() {
			  	 const data = { live_id: this.live_id, status: false }
			  	 const result = await this.$apis.endLiveById(data)
			  	 if(result.code === "000000") {
					 this.pusher.stop()
					 uni.showToast({
					 	title: "结束直播"
					 })
			  	
			  	 }
			 },
			 /**
			  * @param {String} channel 
			  * 订阅消息, 接收消息
			  * **/
			  subscribeMsg(channel) {
				 // console.log(channel, "live_id")
			  	 this.$goEasy.subscribe({
			  		 channel: channel,
			  		 onMessage: (message) => {
			  			// console.log("Channel:" + message.channel + " content:" + message.content);
						const barrage = uni.getSubNVueById("barrage")
						barrage.postMessage({
							msg: message.content
						})
			  		 }
			  	 })
			  },
		},
		onBackPress() {
			this.endLiveById()
			this.pusher.close()
		},
		onUnload() {
			this.pusher.close()
			uni.$off("startStatus")
			uni.$off("pauseStatus")
		},
	}
</script>

<style>
</style>
