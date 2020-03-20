<template>
	<view>
		<input type="text"  v-model="goods_name" />
		<input type="text"  v-model="goods_price" />
		<input type="text"  v-model="goods_avatar" />
		<input type="text"  v-model="goods_stock" />
		<input type="text"  v-model="goods_stock" />
		<input type="text"  v-model="goods_stock" />
		<button type="primary" @click="createGoods">创建商品</button>
		<view>
			<text>商品列表</text>
			<view v-for="(item,index) in goodsList" :key="index">
				<view style="width: 100%;height: 50px;" @click="goodsItemtoPage(item.goods_id)">
					<image style="width: 100upx;height: 100upx;" :src="item.goods_avatar" mode="aspectFill"></image>
					<text>{{item.goods_name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop_id: "",
				goods_name: "泰国榴莲十五天发货",
				goods_stock: "100箱",
				goods_price: "169.88",
				goods_avatar: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg",
				goodsList: []
			}
		},
		onLoad(data) {
			this.shop_id = data.shop_id
			this.init()
		},
		methods: {
			// 页面初始化
			init() {
				this.getGoodsByShop()
			},
			// 创建商品
			async createGoods() {
				const data = { 
					shop_id: this.shop_id,
					goods_name: this.goods_name,
					goods_price: this.goods_price,
					goods_stock: this.goods_stock,
					goods_avatar: this.goods_avatar
				}
				const result = await this.$apis.createGoods(data)
				if(result.code === "000000") {
					uni.showToast({
						title: "添加商品成功"
					})
				}
			},
			// 获取该店铺下所有的商品
			async getGoodsByShop() {
				const data = { shop_id: this.shop_id }
				const result = await this.$apis.getGoodsByShopId(data)
				if(result.code === "000000") {
					// console.log(result)
					this.goodsList = result.data
				}
			},
			// 跳转商品详情页面
			goodsItemtoPage(goods_id) {
				// console.log(goods_id)
				uni.navigateTo({
					url: './goods-item?goods_id='+goods_id
				})
			}
		}
	}
</script>

<style>

</style>
