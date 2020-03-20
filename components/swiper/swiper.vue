<template>
	<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<template v-for="(item , index) in speciaLive">
			<!-- <template v-if="item.status"> -->
			<swiper-item  
			  :key="index" 
			  class="swiper-item" 
			  :style="{ backgroundImage: 'url('+ item.live_poster +')'}" 
			  @click="onClickInLive(item)">
				<view class="live-status">
					<template v-if="item.status">
						<view class="status"></view>直播中
					</template>
					<template v-else>
						<view class="status" :style=" {borderColor: '#DDDDDD' }" ></view>未上线
					</template>
				</view>
			</swiper-item>
			<!-- </template> -->
		</template>
	</swiper>
</template>

<script>
	export default {
		name: 'swiper',
		props:{
			speciaLive: {
				type: Array
			}
		},
		methods: {
			onClickInLive(item) {
				// console.log(item)
			  if(!item.status) {
			  	uni.showToast({
			  		title: '主播不再线'
			  	})
			  	return;
			  }
			  uni.showToast({
			     title: '进入直播间'
			  })
			  uni.navigateTo({
			  	url: '/pages/cus_pages/livePlayer/livePlayer?live_id='+item.live_id
			  })
			}
		}
	}
</script>

<style lang="scss" scoped>
  .swiper {
	  height: 160px;
	  margin: 10px 3px;
	  border: none;
	  .swiper-item {
		  position: relative;
		  background-size: 350px 160px;
		  background-repeat: no-repeat;
		  .live-status {
		  	position: absolute;
		  	margin: 20upx 0 0 20upx;
			padding: 0 8px;
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
  }
</style>
