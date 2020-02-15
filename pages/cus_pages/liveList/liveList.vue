<template>
	<view  class="main-content">
		<!-- 轮播图展示 -->
		<swiper-live :speciaLive="speciaLive" />
		<!-- 直播列表展示 -->
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" >
		    <template v-for="(item ,index) in liveList" >
		    	<card :key="index" :imgUrl="item.imgUrl" :status="item.status" :userName="item.userName" :avatarUrl="item.avatarUrl"></card>
		    </template>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js"
	import SwiperLive from '@/components/swiper/swiper.vue'
	import Card from '@/components/card/liveModal.vue'
	
	export default {
		name: 'LiveList',
	    mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				liveList: [
					{ imgUrl: '../../static/apple.jpg', status: true, userName: 'BrightWine' ,avatarUrl: '../../static/testuser.png'},
					{ imgUrl: '../../static/apple.jpg', status: false, userName: 'BrightWine' ,avatarUrl: '../../static/testuser.png'},
					{ imgUrl: '../../static/apple.jpg', status: true, userName: 'BrightWine' ,avatarUrl: '../../static/testuser.png'},
					{ imgUrl: '../../static/apple.jpg', status: false, userName: 'BrightWine' ,avatarUrl: '../../static/testuser.png'},
					{ imgUrl: '../../static/apple.jpg', status: true, userName: 'BrightWine' ,avatarUrl: '../../static/testuser.png'},
					{ imgUrl: '../../static/apple.jpg', status: false, userName: 'BrightWine' ,avatarUrl: '../../static/testuser.png'}
				],
				speciaLive: [
						{ imgUrl: '../../static/apple.jpg', status: true},
						{ imgUrl: '../../static/apple.jpg', status: true},
						{ imgUrl: '../../static/apple.jpg', status: true},
						{ imgUrl: '../../static/apple.jpg', status: false}
					],
			};
		},
		methods: {
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.endSuccess();
				console.log('下拉刷新')
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				//联网加载数据
				console.log('上拉加载')
				this.mescroll.endSuccess();
				// this.mescroll.endErr();
				// console.log('上拉加载')
			}
			
		},
		components: {
			card: Card ,
			SwiperLive
		}
	}
</script>

<style lang="scss">
 
</style>
