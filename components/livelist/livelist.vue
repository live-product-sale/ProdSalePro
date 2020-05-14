<template>
	<view class="content">
		<view class="main">
			<template v-for="(item ,index) in liveList" >
				<live-card 
				  class="item"
				  :key="item.shop_id"
				  :live_id="item.live.live_id"
				  :goods_avatar="item.goods[0].goods_avatar" 
				  :goods_price="item.goods[0].goodsinfos[0].goods_price"
				  :status="item.live.status" 
				  :user_name="item.shop_name" 
				  :introduction="item.instructions"
				  :live_avatar="item.live.live_avatar"
				  :shop_avatar="item.shop_avatar"
				  :att_amount="amountFormat(item.live.att_amount)"
				  :view_amount="amountFormat(item.live.view_amount)"
				  ></live-card>
			</template>
		</view>
	</view>
</template>

<script>
	import LiveCard from '@/components/card/liveModal.vue'
	
	export default {
		name: 'LiveList',
		props:['liveList'],
		components: {
			LiveCard
		},
		methods:{
			/**
			 * 对数据进行检验
			 * */
			amountFormat(amount) {
				const num = parseInt(amount)
				if( num < 9999) {
					return num
				} else {
				   const wan = parseInt(num / 10000)
				   const qian = num % 10000
				   return qian === 0 ?  `${wan}万` : `${wan}.${ parseInt(qian / 1000)}`
				} 
			}
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
