<template>
	<view>
		<input type="text" placeholeder="商店名称"  v-model="shop.shop_name"/>
		<input type="text" placeholeder="商店图片地址" v-model="shop.shop_avatar"/>
		<button type="primary" @click="sendbtn">提交</button>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shop: {
					shop_name: '谢广坤服务站',
					shop_avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
				}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			// 页面初始化
			init() {
			},
			async sendbtn() {
				const uid = this.$store.state.info.uid
				const data = JSON.parse(JSON.stringify(this.shop))
				data["uid"] = uid
				const result = await this.$apis.createShop(data)
				
			},
		
		}
	}
</script>

<style>

</style>
