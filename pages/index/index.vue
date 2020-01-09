<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		 <navigator url="/pages/login/login" hover-class="other-navigator-hover">
		      <button type="default">跳转登陆页面</button>
		 </navigator>
		 <button type="default" @click="logOut">退出应用</button>
		 <view>
			 <navigator url="/pages/bus_pages/livePusher/livePusher">主播端</navigator>
			 <navigator url="/pages/cus_pages/livePlayer/livePlayer">观众端</navigator>
		 </view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// 如果token不存在，跳转登陆页面
           const token = uni.getStorageSync('token')
		   if(!token) {
			   uni.redirectTo({
			   	url: '../login/login'
			   });
		   }
		},
		onShow() {
			uni.showToast({
				title:"显示成功",
				duration:2000,
				position: 'center'
			})
		},
		methods: {
            logOut: function() {
				uni.clearStorageSync()
				uni.reLaunch({
					url: '../login/login'
				})
				// #ifdef APP-PLUS  
				// plus.runtime.quit();    // 只是退到后台，没有杀死进程 
				// #endif
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
