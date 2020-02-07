<template>
	 <view></view>
</template>

<script>
	export default {
		data() {
			return {
				pusher: null,                // 推流对象
				currentWebView: {},          // 视图容器
				pushObj: {
					livepushurl: 'rtmp://67845.livepush.myqcloud.com/live/test?txSecret=ff5eebf7a0ce4bafd50434104b31792c&txTime=5E04D8FF', //推流地址,暂时用于测试
					beauty: '1',             // 美颜默认开启
					whiteness: '3',          // 美白等级 
					mode: 'HD'               // 视频等级
				}
			}
		},
		onLoad() {
			this.getWebView()
			this.getSubView()
		},
		onBackPress() {
			this.pusherClose()
		},
		methods: {
			/**
			 * 创建推流对象
			 */
			createPush(pushObj) {
				this.pusher = new plus.video.LivePusher("pusher", {
					'width': '100%',                                        // 设备宽度
					'height': '100%',                                       // 设备高度
					'position': 'static',                                   // 视频布局模式
					'top': 0,                                               // 距离头部0px
					'left': 0,                                              // 距设备左边像素
					'aspect': '9:16',                                       // 宽高比
					'auto-focus': true,                                     // 是否开启自动聚焦
					'beauty': pushObj.beauty,                               // 是否开启美颜
					'whiteness': pushObj.whiteness,                         // 0, 1,2,3,4,5  0 不使用美白， 值越大，美白效果越好
					'mode': pushObj.mode,                                   // 推流视频模式 ，SD标清， HD高清， FHD 超清
					'url': pushObj.livepushurl ,                            // 推流地址
				})
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
				const getcurrentWebview = currentPage.$getAppWebview()
				this.currentWebview = getcurrentWebview
				// #endif
				this.currentWebview = getcurrentWebview
				this.createPush(this.pushObj)                             // 创建推流对象
				
			},  
			/**
			 * 开始推流
			 */
			pusherStart() {
				if(!this.pusher) {
				  this.pusher.start()
				}
			},
			/**
			 * 结束推流
			 */
			pusherStop() {
				if(!this.pusher) {
					this.pusher.stop()
				}
			},
			/**
			 * 暂停推流
			 */
			pusherPause() {
				if(!this.pusher) {
					this.pusher.pause()
				}
			},
			/**
			 * 恢复推流
			 */
			pusherResume() {
				if(!this.pusher) {
					this.pusher.resume()
				}
			},
			/**
			 * 销毁直播对象，一旦销毁，不可在用
			 */
			pusherClose() {
				if(!this.pusher) {
					this.pusher.close()
				}
			},
			/**
			 * 切换摄像头
			 */
			pusherSwitchCamera() {
				if(!this.pusher) {
					this.pusher.switchCamera()
				}
			},
			/**
			 * 获取当前子窗口
			 */
			getSubView() {
				const pushHeader = uni.getSubNVueById("pushHeader")
				pushHeader.show()
				const pushBarrage = uni.getSubNVueById("pushBarrage")	
				pushBarrage.show()
				const pushFooter = uni.getSubNVueById("pushFooter")
				pushFooter.show()
			}
		}
	}
</script>

<style>
</style>
