<template>
	<view class="main-content">
		<button type="primary" @click="Toshop">创建商家</button>
		<view>我的商店</view>
	    <view class="shop-list">
		    <view class="shop-item" v-for="(item ,index) in shopList" :key="item.id">
				<image :src="item.shop_avatar" mode="aspectFit"></image>
				<button type="primary" @click="enterShop(item.shop_id)">进入商店</button>
			</view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopList: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 页面初始化
			init() {
				this.getShopList()
			},
			// 创建商店
			Toshop() {
				uni.navigateTo({
					url: '../shop/shopModal'
				})
			},
			//进入商店
			enterShop(data){
				uni.navigateTo({
					url:'../shop/shopView?shop_id='+data
				})
			},
			// 获取该用户的商店信息
			async getShopList() {
				const uid = this.$store.state.info.uid
				const result = await this.$apis.getShopList({uid})
				if(result.code === "000000") {
				   this.shopList = result.data
				}
			}
		}
	}
</script>

<style lang="scss">
    .shop-item {
		width: 100%;
		height: 200upx;
		border: 1px solid #000000;
		image {
			width: 300upx;
			height: 200upx;
		}
	}
</style>
