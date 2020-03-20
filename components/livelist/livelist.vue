<template>
	<view class="content">
		<view class="main">
			<template v-for="(item ,index) in liveList" >
				<live-card 
				  class="item"
				  :key="item.live_id"
				  :live_id="item.live_id"
				  :goods_avatar="item.goods_avatar" 
				  :status="item.status" 
				  :user_name="item.shop_name" 
				  :introduction="item.shop_slogan"
				  :live_avatar="item.live_poster"
				  :price="item.goods_price"
				  :shop_avatar="item.shop_avatar"
				  ></live-card>
			</template>
		</view>
	</view>
</template>

<script>
	import LiveCard from '@/components/card/liveModal.vue'
	
	export default {
		name: 'LiveList',
		props:{
			liveList: {
				type: Array,
				default: []
			}
		},
		onLoad() {
			// console.log(this.liveList)
		},
		components: {
			LiveCard
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// margin-top: 20upx;
		// background: #FFFFFF;
		padding: 10upx 0;
		border-radius: 8px;
		.main {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			.item {
				margin:0 15upx;
			}
		}
	}
</style>
