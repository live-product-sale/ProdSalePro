<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
				player: null,        // 放置播放器
				liveplayurl: 'rtmp://zhangly.xyz/live/test?txSecret=67f1e2c359f98e8231b1c96913903f7a&txTime=5E04CAEF',  // 拉流地址
				currentWebView: null //容器存放当前页面		
			}
		},
		onLoad() {
			// 页面生命周期，页面加载时启动，参数是上个页面传递的参数，用于页面传参
			this.getwebView()        //获取当前webviewå
			this.getSubNvue()
		},
		onBackPress() {
			this.player.close()
		},
		methods: {
			/**
			 *  获取当前显示的 webview 实例，方便操作
			 */
			getwebView() {
				const pages = getCurrentPages()  //获取所有页面对象,数组的最后一个是当前页面
				const page = pages[pages.length - 1]  // 获取当前页面
				//#ifdef APP-PLUS
				const webView = page.$getAppWebview()  // 得到当前页面的对象实例
				this.currentWebView = webView
				// this.plusPlay() //创建Liveplay 对象
				//#endif
                this.plusPlay() //创建Liveplay 对象
			},
			/**
			 * 创建播放器，即拉流对象
			 */
			plusPlay() {
				this.player = new plus.video.VideoPlayer('play', {
					'src': this.liveplayurl,                                 // 视频地址
					'top': '100upx',                                         // 播放器距屏幕上方的像素
					'width': uni.getSystemInfoSync().windowWidth + 'px',     // 播放器的宽度
					'height': uni.getSystemInfoSync().windowHeight + 'px',   // 播放器的高度
					'position': 'static',                                    // 播放器的布局模式
					'objectFit': 'fill',                                     // 视频的表现形式
					'show-fullscreen-btn': false,                            // 播放器的是否显示全屏按钮
					'show-play-btn': false,                                  // 播放器底部控制按钮
					'autoplay': true,                                        // 视频是否自动播放
					'direction': 0,                                          // 设置全屏时的视频方向
					'poster': '',                                            // 视频封面图片地址
				})
				this.currentWebView.append(this.player)
			},
			/**
			 * 获取子窗口
			 */
			getSubNvue() {
				const product = uni.getSubNVueById('liveProduct')
				product.show()
				const barrage = uni.getSubNVueById('liveBarrage')
				barrage.show()
				const liveFooter = uni.getSubNVueById('liveFooter')
				liveFooter.show()
				const liveHeader = uni.getSubNVueById('liveHeader')
				liveHeader.show()
			}
		}
	}
</script>

<style>
 
</style>
