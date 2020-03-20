<template>
	<view class="main-content">
		<view>创建直播间</view>
		<view class="inputinfo">
			<input type="text"  v-model="live_poster"/>
			<input type="text"  v-model="shop_avatar" />
			<input type="text"  v-model="shop_slogan" />
			<input type="text"  v-model="shop_name" />
			<input type="text"  v-model="goods_avatar" />
			<input type="text"  v-model="goods_price" />
		</view>
		<button type="primary" @click="sendLive">创建直播间</button>
		<view class="live">
			我的直播间
			<view class="live-item" v-for="(item, index) in liveList" :key="item.live_id">
				<image  :src="item.live_poster" mode="aspectFit"></image>
				<button type="primary" @click="enterLive(item.live_id)">主播上线</button>
			</view>
		</view>
		<view class="goods">
			商品信息
			<button type="primary" @click="createGoods">添加商品</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_id: '',
				liveList: [],
				live_poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
				shop_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
				shop_slogan: '广坤山货便宜大甩卖',
				shop_name: '谢广坤山货服务站',
				goods_avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg",
				goods_price: "46.66"
				}
		},
		onLoad(data) {
			this.shop_id = data.shop_id
			this.init()
		},
		methods:{
			// 页面初始化
			init() {
				this.getLive()
			},
			// 创建直播间
			async sendLive() {
				const data = {
					shop_id: this.shop_id,
					live_poster: this.live_poster,
					shop_avatar: this.shop_avatar,
					shop_slogan: this.shop_slogan,
					shop_name: this.shop_name,
					goods_avatar: this.goods_avatar,
					goods_price: this.goods_price	
				}
				const result = await this.$apis.createLive(data)
				if(result.code ="000000") {
					uni.showToast({
						title: '创建成功',
					})
				}
			},
			// 获取直播间信息
			async getLive() {
				const result = await this.$apis.getLiveByShop({ shop_id: this.shop_id})
				this.liveList = result.data
				// console.log(result)
			},
			// 主播进入主播间
			enterLive(live_id) {
				// console.log(live_id)
				uni.navigateTo({
					url: '../livePusher/livePusher?live_id='+live_id
				})
			},
			// 创建商品
			createGoods() {
				uni.navigateTo({
					url:"../goods/goods?shop_id="+this.shop_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.live-item{
		// width: 200upx;
		// height: 200upx;
	
		image {
			width: 300upx;
			height: 300upx;
		    border: 1rpx solid #000000;
		}
	}
</style>
