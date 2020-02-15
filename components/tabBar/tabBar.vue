<template>
	<view class="content">
		<view v-for="(item,index) in navbar" :key="index">
			<view
			  :class="item.id === Container.id? 'navbar': '' " 
			  :key="item.name"
			  @tap="outNavName(item)"
			  >
			  <view class="tab-img">
				  <image 
				    style="width: 25px;height: 25px;" 
					:src="item.id === Container.id ? item.imgActive : item.imgUrl" 
					mode="aspectFit"></image>
			  </view>
			  <view style="font-size: 10px;"> {{ item.name }} </view>
			  </view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'TabBar',
		data() {
			return {
				navbar: [
					{ id: 1, name: '首页', isTarget: true , imgUrl: '../../static/tabbarimg/index.png', imgActive: '../../static/tabbarimg/index-active.png'},
					{ id: 2, name: '关注', isTarget: false , imgUrl: '../../static/tabbarimg/attent.png', imgActive: '../../static/tabbarimg/attent-active.png' },
					{ id: 3, name: '消息', isTarget: false, imgUrl: '../../static/tabbarimg/message.png', imgActive: '../../static/tabbarimg/message-active.png' },
					{ id: 4, name: '购物车', isTarget: false, imgUrl: '../../static/tabbarimg/cat.png', imgActive: '../../static/tabbarimg/cat-active.png'},
					{ id: 5, name: '我的', isTarget: false, imgUrl: '../../static/tabbarimg/me.png', imgActive: '../../static/tabbarimg/me-active.png'}
				],
				Container: { id: 1 }
			}
		},
		methods:{
			outNavName: function(item) {
				// console.log(item.name, item.component)
				this.Container.id = item.id
				this.$emit('NavInfo',{ title: item.name, id: item.id })
			}
		}	
	}
</script>

<style lang="scss" scoped>
	.content {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 30upx 0 20upx 0;
		background: $color-primary;
		display: flex;
		justify-content: space-around;
		align-content: center;
		color: #C8C7CC;
		text-align: center;
		.navbar {
			color: #F8F8F8;
			transition: color 0.1s linear;
		}
	}
</style>
