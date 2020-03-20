<template>
	<view class="content">
		<view v-for="(item, index) in categoryList" :key="index" >
			<view class="item" @click="navTo(index)">
				<image :src="item.img_url" mode="aspectFill"></image>
				<text >{{item.name}}</text>
			</view>	
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'Category',
		data() {
			return {
				categoryList: [
					{ name: '品质水果', img_url: '../../../static/categoryimg/fruit.jpg'},
					{ name: '新鲜蔬菜', img_url: '../../../static/categoryimg/vegetables.jpg'},
					{ name: '粮油米面', img_url: '../../../static/categoryimg/oilnoodles.jpg'},
					{ name: '水产品', img_url: '../../../static/categoryimg/aquatic.jpg'},
					{ name: '农副加工', img_url: '../../../static/categoryimg/agricultural.jpeg'},
					{ name: '肉禽蛋品', img_url: '../../../static/categoryimg/egg.jpeg'},
					{ name: '苗木花草', 'img_url': '../../../static/categoryimg/plant.jpg'},
				    { name: '更多', 'img_url': '../../../static/categoryimg/more.png'}
				]
			}
		},
		props:{
			
		},
		methods: {
			checkbtn(e) {
				console.log(e.detail.index)
			},
			navTo(index) {
				uni.showToast({
					title: `前往${this.categoryList[index].name}分类模版`
				})
				uni.navigateTo({
					url: '/pages/cus_pages/category/category?range='+this.categoryList[index].name+'&range_id='+index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #FFFFFF;
		border-radius: 10upx;
		padding: 20upx 20upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content:space-between;
			.item {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				font-size: 11px;
				width: 150upx;
				height: 150upx;
				image {
					width: 100upx;
					height: 100upx;
					border-radius: 50%;

				}
				text {
					letter-spacing: .5px;
					font-size: 24upx;
				}
				&:hover {
					background: #EEEEEE;
				}
			}
			
	}	
</style>
