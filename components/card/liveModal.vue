<template>
	<view class="live-card" @click="onClick(status)">
		<view class="cardimg" :style="{backgroundImage: 'url('+live_avatar+')'}" >
			<view class="live-status">
				<template v-if="status">
					<view class="status"></view>直播中
				</template>
				<template v-else>
					<view class="status" :style=" {borderColor: '#DDDDDD' }" ></view>直播中
				</template>
			</view>
		</view>
		<view class="live-info">
			<view class="left">
				<view class="info">{{introduction}}</view>
				<view class="title">
					<image :src="shop_avatar" mode="aspectFit" lazy-load="true"></image>
					<text>{{user_name}}</text>
				</view>
			</view>
			<view class="right">
				<image :src="goods_avatar" mode="aspectFill" lazy-load="true" ></image>
				<text>¥{{price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniCard',
		props: {
			live_id: {
				type: String,
				default: ''
			},
			goods_avatar: {
				type: String,
				default: ''
			},
			status: {
				type: Boolean,
				default: false
			},
			live_avatar: {
				type: String,
				default: ''
			},
			user_name: {
				type: String,
				default: ''
			},
			introduction: {
				type: String,
				default: ''
			},
			price: {
				type: Number,
				default: 0
			},
			shop_avatar:{
				type: String,
				default:''
			}
			
		},
		methods: {
			onClick(status) {
				if(!status) {
					uni.showToast({
						title: '主播不再线'
					})
					return;
				}
				uni.showToast({
			       title: '进入直播间'
				})
				uni.navigateTo({
					url: '/pages/cus_pages/livePlayer/livePlayer?live_id='+this.live_id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.live-card {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		width: 160px;
		border: none;
		margin: 10upx 0;
		.cardimg {
			position: relative;
			height: 200px;
			border-top-right-radius: 5px;
			border-top-left-radius: 5px;
			background-size: 160px 205px;
			background-origin: content-box;
			.live-status {
				position: absolute;
				margin: 20upx 0 0 20upx;
				padding: 0 5px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 20px;
				line-height: 20px;
				border-radius: 5px;
				background: $color-primary;
				color: #FFFFFF;
				font-size: 24upx;
				letter-spacing: .5upx;
				.status {
					display: inline-block;
					vertical-align: middle;
					margin-right: 5px;
					width: 0;
					height: 0;
					border: 3px solid #4CD964;
					border-radius: 50%;
				}
			}
		}
		.live-info {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			border-bottom-right-radius: 5px;
			border-bottom-left-radius: 5px;
			height: 65px;
			background: #FFFFFF;
			padding: 10upx 10upx;
			.left {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				flex: 1;
				height: 65px;
				.info {
					height: 40px;
					padding: 5upx 10upx;
					word-wrap: break-word;
					font-size: 24upx;
					letter-spacing: .5px;
				}
				.title {
					display: flex;
					height: 25px;
					flex-direction: row;
					align-items: flex-start;
					image {
						width: 46upx;
						height: 46upx;
						border-radius: 50%;
						margin-right: 5upx;
					}
					text {
						font-size: 20upx;
						letter-spacing:.5px;
					}
				}
			}
			.right {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				width: 90upx;
				height: 130upx;
				background: #EFEFF4;
				border-radius: 10upx;
				image {
					width: 90upx;
					height: 90upx;
					border-radius: 10upx;
				}
				text{
					font-size: 24upx;
				}
			}
		}
	}
</style>