<template>
	<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<template v-for="(item , index) in speciaLive">
			<template v-if="item.status">
			<swiper-item  
			  :key="index" 
			  class="swiper-item" 
			  :style="{ backgroundImage: 'url('+ item.imgUrl +')'}" 
			  @click="onClickInLive">
				<view class="live-status">
					<view class="status"></view>直播热卖中
				</view>
			</swiper-item>
			</template>
		</template>
	</swiper>
</template>

<script>
	export default {
		name: 'swiper',
		props:{
			speciaLive: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			onClickInLive() {
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
  .swiper {
	  height: 160px;
	  margin: 10px 3px;
	  border-radius: 10px;
	  border: none;
	  .swiper-item {
		  // background-image:url(../../static/apple.jpg) ;
		  border-radius: 10px;
		  position: relative;
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
	  }
  }
</style>
