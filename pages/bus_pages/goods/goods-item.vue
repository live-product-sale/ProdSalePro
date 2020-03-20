<template>
	<view class="">
		<text>完善商品信息</text>
		<input type="text" value="" v-model="net_weight" />
		<input type="text" value="" v-model="specification" />
		<button type="primary" @click="sendGoodsInfo">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id: "",                   // 商品ID
				net_weight: "8斤",              // 净含量
				specification:"80mm-90mm"       //规格
			}
		},
		onLoad(data) {
			this.goods_id = data.goods_id
		},
		methods: {
			async sendGoodsInfo() {
				const data = {
					goods_id: this.goods_id,
					goods_stock: this.goods_stock,
					net_weight: this.net_weight,
					specification: this.specification
				}
				const result = await this.$apis.perfectGoods(data)
				if(result.code === "000000") {
					uni.showToast({
						title: "提交完成"
					})
				}
			}
		}
	}
</script>

<style>
</style>
