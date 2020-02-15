<template>
	<view class="content">
			<view class="logo">
				<image style="width: 35px;height: 35px;" src="../../static/logo/video.png" mode="aspectFit"></image>
			</view>
				<view class="title">{{ title }}</view>
				<view class="search">
					<navigator url="">
						 <icon :type="'search'" size="26"/>
					</navigator>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		name: 'TopNav',
		props: {
			title: {
				type: String,
				default: ''
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		position: fixed;
		padding: 50upx 20upx 20upx 20upx;
		box-sizing: border-box;
		margin: 0 0;
		width: 100%;
		background: $color-primary;
		display: flex;
		justify-content: center;
		z-index: 1;
		align-content: center;
		color: #C8C7CC;
		.logo {
			position: absolute;
			left: 20upx;
		}
		.title {
			color: #FFFFFF;
		}
		.search {
			position: absolute;
			right: 15upx;
		}

	}
</style>
