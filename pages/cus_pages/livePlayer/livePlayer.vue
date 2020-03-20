<template>
	<view ></view>
</template>

<script>
	// import IO from '@/common/socket-io/weapp.socket.io.js'
	export default {
		data() {
			return {
				currentWebView: null,      //容器存放当前页面
				player: null,              // 放置播放器
				isShowProduct: false,      // 商品子窗口默认不展示
				isDetail: false,           // 商品详细页面默认不展示
				livePlay: {
					live_id: '',           // 直播间ID	
					live_play: '',         // 直播地址
					live_poster: '',       // 拉流图片
					isfollow: '',          // 关注人数
					shop_id: '',           // 商店ID
					shop_name: '',         // 商店名称
					shop_avatar: '',       // 商店头像
					// sort_id: ''	           // 商店分类
				}	
			}
		},
		onLoad(data) {
			// 页面初始化
			// const socket = IO ("http://192.168.43.118:4000")
			// socket.on("connect", () => {
			// 	console.log("successful")
			// })
			
			this.livePlay["live_id"] = data.live_id
			this.init()
			// 监听窗体消息
			this.monitor()
		},
		watch: {
			isShowProduct(newValue, oldValue) {
				const product = uni.getSubNVueById('liveProduct')
				if(newValue) {
					product.show('slide-in-bottom')
				} else {
					product.hide('slide-out-bottom')
				}
			},
			isDetail(newValue, oldValue) {
				const detail = uni.getSubNVueById('prodDetail')
				if( newValue ) {
					detail.show('slide-in-bottom')
				} else {
					detail.hide('slide-out-bottom')
				}
			}
		},
		onBackPress(event) {
			if(this.isShowProduct  || this.isDetail) {
				this.isDetail = false
				this.isShowProduct = false
				return true
			}
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
			},
			/**
			 * 监听窗体消息
			 * */
			 monitor() {
				 uni.$on('Product', (data) => {
				 	this.isShowProduct = data.value
				 })
				 uni.$on('isDetail', (data) => {
				 	this.isDetail = data.isShowdetail
				 	this.isShowProduct = data.isShowProduct
				 })
				 uni.$on("goods_id", (data) => {
					 this.getGoodsById(data.goods_id)
				 })
				 uni.$on("likeRoom", (res) => {
					 const uid = this.$store.state.info.uid
					 this.$apis.attentionLive({...res.data, uid })
				 })
				 const subNvue = uni.getSubNVueById("prodDetail")
				 subNvue.onMessage(({data}) => {
					 const uid = this.$store.state.info.uid
					 const shop_id = this.livePlay.shop_id
					 this.increaseCart({uid: uid, shop_id:shop_id, ...data.cartData})
				 })
				 
			 },
			/**
			 *  获取当前显示的 webview 实例，方便操作
			 */
			getwebView() {
				const pages = getCurrentPages()  //获取所有页面对象,数组的最后一个是当前页面
				const page = pages[pages.length - 1]  // 获取当前页面
				//#ifdef APP-PLUS
				const webView = page.$getAppWebview()  // 得到当前页面的对象实例
				this.currentWebView = webView
				//#endif
                this.plusPlay() //创建Liveplay 对象
			},
			/**
			 * 创建播放器，即拉流对象
			 */
			plusPlay() {
				// console.log(this.livePlay.live_play)
				const styles = {
					'src': this.livePlay.live_play,                          // 视频地址
					'top': '100upx',                                         // 播放器距屏幕上方的像素
					'width': uni.getSystemInfoSync().windowWidth + 'px',     // 播放器的宽度
					'height': uni.getSystemInfoSync().windowHeight + 'px',   // 播放器的高度
					'position': 'static',                                    // 播放器的布局模式
					'objectFit': 'fill',                                     // 视频的表现形式
					'show-fullscreen-btn': false,                            // 播放器的是否显示全屏按钮
					'show-play-btn': false,                                  // 播放器底部控制按钮
					'autoplay': true,                                        // 视频是否自动播放
					'enable-danmu':false,                                    // 是否展示弹幕
					'danmu-btn': false,                                      // 是否显示弹幕按钮
					'show-progress': false,                                  // 不显示播放进度
					'direction': 0,                                          // 设置全屏时的视频方向
					'poster': this.livePlay.live_poster,                     // 视频封面图片地址
				}
				// #ifdef APP-PLUS
				this.player = new plus.video.VideoPlayer('play', styles)
				// #endif
				this.currentWebView.append(this.player)
				this.player.addEventListener('waiting',function() {
					console.log('视频加载中')
				}, false)
				this.player.addEventListener('error', function(err) {
					console.log(JSON.stringify(err))
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
				 const data = { live_id: this.livePlay.live_id }
				 const result = await this.$apis.getLivePlay(data)
				 if(result.code === "000000") {
					 // console.log(result)
					 this.livePlay = { ...result.data }
					 const header = uni.getSubNVueById("liveHeader")
					 header.postMessage({
						 "liveHeadInfo": {
							 "live_id": this.livePlay.live_id,
							 "isfollow": this.livePlay.isfollow,
							 "shop_name": this.livePlay.shop_name,
							 "shop_avatar": this.livePlay.shop_avatar
						 }
					 })
				 }
			 },
			 /**
			  * 根据shop_id 获取商品信息
			  * @param {String} shop_id
			  * */
			  async getGoodSByShop() {
				  const { shop_id } = this.livePlay
				  const result = await this.$apis.getGoodsByShopId({ shop_id: shop_id })
				  if(result.code === "000000") {
					  // console.log(result)
					  const goods = uni.getSubNVueById('liveProduct')
					  goods.postMessage({
						  "productData": result.data
					  })  
				  }
			  },
			/**
			 * 根据goods_id 获取商品详情
			 * */
			 async getGoodsById(id) {
				 const data = { goods_id: id }
				 const result = await this.$apis.getGoodsByGoodsId(data)
				 if(result.code === "000000") {
					 const detail = uni.getSubNVueById("prodDetail")
					 detail.postMessage({
						 "goodInfo": result.data
					 })
				 }
			 },
			 /**
			  * 添加购物车,
			  * @param {Object} data 
			  * */
			  async increaseCart(data) {
				  const result = await this.$apis.increaseCart(data)
				  if(result.code === "000000") {
					uni.showToast({
						title: '已添加购物车'
					})
				  }
			  },
			  
		},
		onUnload() {
			uni.$off('showProduct')
			uni.$off('barrage')
			uni.$off('productData')
			uni.$off('isDetail')
			uni.$off('goods_id')
			uni.$off('likeRoom')
		}
	}
</script>

<style>
</style>
