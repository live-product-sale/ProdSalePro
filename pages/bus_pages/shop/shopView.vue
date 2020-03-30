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
			<picker style="height: 100upx; border: 1px solid #000000;" 
			    mode="selector" 
			    :range="range"
				range-key="range[range_id].name"
				@change="changeRange">
				<view>{{range[range_id].name}}</view>
			</picker>
			<picker mode="selector" range-key="sortRange[sort_id].name" :range="sortRange" :value="sort_id" @change="changeSort">
				<view>{{sortRange[sort_id].name}}</view>
			</picker>
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
				range_id: 0,
				sort_id: 0,
				sortRange:[],
				range: ["品质水果","新鲜蔬菜", "粮油米面", "水产品", "农副加工", "肉禽蛋品", "苗木花草", "其他类型"],
				sort_name: "苹果",
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
		beforeMount() {
		},
		onLoad(data) {
			// console.log(data.shop_id)
			this.shop_id = data.shop_id
			this.init()
		},
		methods:{
			// 页面初始化
			init() {
				this.getLive()
				this.getAllRange()
				this.getAllSortByRangeId()
			},
			// 选择直播间的类型
			changeRange(e) {
				this.range_id = e.detail.value
				console.log(this.range[this.range_id].name)
			},
			// 选择直播的产品类型
			changeSort(e) {
				this.sort_id = e.detail.value
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
					goods_price: this.goods_price,
					range_id: this.range_id,
					sort_name: this.sort_name
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
				console.log(result)
				this.liveList = result.data
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
			},
			// 获取直播间类型
			async getAllRange() {
				const result = await this.$apis.getAllRange()
				if(result.code === "000000") {
					this.range = result.data
				}
			},
			// 获取产品类型名称
			async getAllSortByRangeId() {
				const result = await this.$apis.getAllSortByRangeId({range_id: this.range_id})
				if(result.code === "000000") {
					// console.log(result)
					this.sortRange = result.data
				}
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
