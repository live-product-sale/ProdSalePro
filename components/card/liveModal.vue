<template>
	<view class="live-card" :style="{backgroundImage: 'url('+imgUrl+')'}" @click="onClick(status)">
		<view class="live-status">
			<template v-if="status">
				<view class="status"></view>直播中
			</template>
			<template v-else>
				<view class="status" :style=" {borderColor: '#DDDDDD' }" ></view>直播中
			</template>
		</view>
		<view class="live-info">
			<image class="live-avatar" :src="avatarUrl" mode="aspectFit" /> 
		    <view class="live-user">{{ userName }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniCard',
		props: {
			imgUrl: {
				type: String,
				default: ''
			},
			status: {
				type: Boolean,
				default: false
			},
			avatarUrl: {
				type: String,
				default: ''
			},
			userName: {
				type: String,
				default: ''
			}
			
		},
		methods: {
			onClick(status) {
				if(!status) {
					uni.showToast({
						title: '主播不再线',
						position: 'center',
						duration: 2000
					})
					return;
				}
				uni.showToast({
			       title: '进入直播间',
				   position: 'center'
				})
				uni.navigateTo({
					url: '../../pages/cus_pages/livePlayer/livePlayer?'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.live-card {
		display: inline-block;
		position: relative;
		width: 160px;
		height: 300px;
		border-radius: 5px;
		border: none;
		margin: 10upx 10upx;
		background-size: 160px 300px;
		background-origin: content-box;
		.live-status {
			position: absolute;
			margin: 20upx 0 0 20upx;
			// width: 60px;
			padding: 0 5px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 20px;
			line-height: 20px;
			border-radius: 5px;
			background: $color-primary;
			color: #FFFFFF;
			font-size: 12px;
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
		.live-info {
			position: relative;
		    display: flex;
			align-items: center;
			height: 50px;
			background: rgba(0,0,0,0.5);
			top: 250px;
			color: #FFFFFF;
			font-size: 10px;
			.live-avatar {
				margin: 0 5px 0 5px;
				width: 40px;
				height: 40px;
				border: 1px solid #FFFFFF;
				border-radius: 50%;
			}
			.live-user {
				position: absolute;
				bottom: 10px;
				left: 50px;
			}
		}
	}
</style>
