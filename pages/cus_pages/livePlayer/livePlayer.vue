<template>
	<view></view>
</template>

<script>
	import IO from '../../../common/socket.io-client/lib/socket.js'
	
	export default {
		data() {
			return {
				currentWebView: null,    //容器存放当前页面
				player: null,            // 放置播放器
				isShowProduct: false,    // 商品子窗口默认不展示
				isDetail: false,         // 商品详细页面默认不展示
				livePlay: {
					live_id: '',         // 直播间ID	
					live_url: '',        // 直播地址
					live_avatar: '',     // 拉流图片
					isfollow: '',        // 关注人数
					shop: {
						shop_id: "",
						shop_name: "",
						shop_avatar: ""
					}
				}
			}
		},
		onLoad(data) {
			// 页面初始化
			this.livePlay["live_id"] = data.live_id
			// 监听窗体消息
			this.monitor()
		},
		mounted() {
			this.init()
			this.enterLive()
		},
		methods: {
			/*
			 *  页面初始化
			 */
			async init() {
				await this.getLivePlayInfo()
				this.getwebView()
				this.getSubNvue()
				await this.getGoodSByShop()
				const data = {
					uid: this.$store.state.info.uid,
					enter_time: parseInt(Date.now() / 1000),
					live_id: this.livePlay.live_id
				}
				await this.$apis.enterLive(data)
			},
			/**
			 * 监听窗体消息
			 * */
			monitor() {
				// 接收弹幕
				this.subscribeMsg(this.livePlay.live_id)
				uni.$on('Product', (data) => {
					this.isShowProduct = data.value
				})
				uni.$on("goods_id", (data) => {
					this.getGoodsById(data.goods_id)
				})
				uni.$on("likeRoom", (res) => {
					const uid = this.$store.state.info.uid
					this.$apis.attentionLive({ ...res.data, uid })
					const channel = this.livePlay.live_id
					const content = {
						name: this.$store.state.info.userInfo.name,
						msg: res.data.isfollow ? '关注了直播间' : '取消了关注'
					}
					this.publishMsg(JSON.stringify(content), channel)
				})
				uni.$on("cartData", (data) => {
					const params = { 
						uid: this.$store.state.info.uid,
						...data
					}
					this.increaseCart(params)
				})
				// 发送弹幕
				uni.$on("barrage", (data) => {
					const channel = this.livePlay.live_id
					const content = {
						name: this.$store.state.info.userInfo.name,
						msg: data.msg
					}
					this.publishMsg(JSON.stringify(content), channel)
				})

			},
			/**
			 *  获取当前显示的 webview 实例，方便操作
			 */
			getwebView() {
				const pages = getCurrentPages()       //获取所有页面对象,数组的最后一个是当前页面
				const page = pages[pages.length - 1]  // 获取当前页面
				//#ifdef APP-PLUS
				const webView = page.$getAppWebview() // 得到当前页面的对象实例
				this.currentWebView = webView
				//#endif
				this.plusPlay()                       //创建Liveplay 对象
			},
			/**
			 * 创建播放器，即拉流对象
			 */
			plusPlay() {
				const styles = {
					'src': this.livePlay.live_url,                              // 视频地址
					// 'top': '100upx',                                         // 播放器距屏幕上方的像素
					'width': uni.getSystemInfoSync().windowWidth + 'px',        // 播放器的宽度
					'height': uni.getSystemInfoSync().windowHeight + 'px',      // 播放器的高度
					'position': 'static',                                       // 播放器的布局模式
					'objectFit': 'fill',                                        // 视频的表现形式
					'show-fullscreen-btn': false,                               // 播放器的是否显示全屏按钮
					'show-play-btn': false,                                     // 播放器底部控制按钮
					'autoplay': true,                                           // 视频是否自动播放
					'enable-danmu': false,                                      // 是否展示弹幕
					'danmu-btn': false,                                         // 是否显示弹幕按钮
					'show-progress': false,                                     // 不显示播放进度
					'direction': 0,                                             // 设置全屏时的视频方向
					'poster': this.livePlay.live_avatar,                        // 视频封面图片地址
				}
				//  #ifdef APP-PLUS
				this.player = new plus.video.VideoPlayer('play', styles)
				// #endif
				this.currentWebView.append(this.player)
				this.player.addEventListener('waiting', () => {
					this.$apis.msg("视频加载中")
				}, false)
				this.player.addEventListener('error', (err) => {
					console.log(JSON.stringify(err), "error")
					this.$apis.msg('主播已下线')
				}, false)
			},
			/**
			 * 获取子窗口
			 */
			getSubNvue() {
				const barrage = uni.getSubNVueById('liveBarrage')
				barrage.show()
				const liveFooter = uni.getSubNVueById('liveFooter')
				liveFooter.show()
				const liveHeader = uni.getSubNVueById('liveHeader')
				liveHeader.show()
				const product = uni.getSubNVueById('liveProduct')
				product.hide()
				const detail = uni.getSubNVueById('prodDetail')
				detail.hide()
			},
			/**
			 * 根据live_id 获取拉流信息
			 *  @param {String} id 
			 * */
			async getLivePlayInfo() {
				const data = {
					uid: this.$store.state.info.uid,
					live_id: this.livePlay.live_id
				}
				const result = await this.$apis.getLivePlay(data)
				if (result.code === "000000") {
					this.livePlay = { ...result.data }
					const info = { 
						live_id: this.livePlay.live_id,
						"shop_name": this.livePlay.shop.shop_name,
						"shop_avatar": this.livePlay.shop.shop_avatar,
						"follow_live": this.livePlay.isfollow
					}
					uni.$emit("headerInfo", info)
				}
			},
			/**
			 * 根据shop_id 获取商品信息
			 * @param {String} shop_id
			 * */
			async getGoodSByShop() {
				const data = { shop_id: this.livePlay.shop.shop_id}
				const result = await this.$apis.getGoodsByShopId(data)
				if (result.code === "000000") {
					// console.log(result.data)
					uni.$emit("liveGoodsInfo", result.data)
					uni.$emit("live_id", { live_id: this.livePlay.live_id})
				}
			},
			/**
			 * 添加购物车,
			 * @param {Object} data 
			 * */
			async increaseCart(data) {
				const result = await this.$apis.increaseCart(data)
				if (result.code === "000000") {
					this.$apis.msg('添加成功')
					const detail = uni.getSubNVueById("prodDetail")
					detail.hide("slide-out-bottom")
				}
			},
			/**
			 * @param {String} channel 
			 * 订阅消息, 接收消息
			 * **/
			subscribeMsg(channel) {
				this.$goEasy.subscribe({
					channel: String(channel),
					onMessage: (message) => {
						const info = { msg: message.content }
						uni.$emit('danmu', info)
					}
				})
			},
			/**
			 * 发布消息
			 * @param {String} msg 
			 * @param {String} channel 
			 * **/
			publishMsg(msg, channel) {
				this.$goEasy.publish({
					channel: String(channel),
					message: msg
				})
			},
			/**
			 * 离开直播间弹幕提示
			 * */
			 outLive() {
				 const channel = this.livePlay.live_id
				 const content = {
					name: this.$store.state.info.userInfo.name,
					msg: '已离开直播间'
				 }
				 this.publishMsg(JSON.stringify(content), channel)
			 },
			 /**
			  * 进入直播间弹幕提示
			  * */
			 enterLive() {
				 const channel = this.livePlay.live_id
				 const content = {
				 	name: this.$store.state.info.userInfo.name,
				 	msg: `已进入直播间`
				 }
				 this.publishMsg(JSON.stringify(content), channel)
			 }
		},
		async onUnload() {
			uni.$off('Product')
			uni.$off('showProduct')
			uni.$off('barrage')
			uni.$off('productData')
			uni.$off('goods_id')
			uni.$off('likeRoom')
			uni.$off('cartData')
			uni.$off('danmu')
			uni.$off('headerInfo')
			uni.$off('liveGoodsInfo')
			uni.$off('live_id')
			
			const data = {
				uid: this.$store.state.info.uid,
				out_time: parseInt(Date.now() / 1000),
				live_id: this.livePlay.live_id
			}
			this.outLive()
			await this.$apis.updateViewMount({type: 'out', live_id:this.livePlay.live_id })
			await this.$apis.outLive(data)
		}
	}
</script>

