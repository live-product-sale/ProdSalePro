<template>
	<view>
	    <top-nav :title="navInfo.title" />
		<template v-if="navInfo.id == 1 ">
			<live-list />
		</template>
		<template v-else-if="navInfo.id == 2 ">
			<attent-live />
		</template>
		<template v-else-if="navInfo.id == 3 ">
			<message-list />
		</template>
		<template v-else-if="navInfo.id == 4 ">
		   <shop-cat />
		</template>
		<template v-else-if="navInfo.id == 5 ">
			<my-center />
		</template>
		<tab-bar v-on:NavInfo="getNavInfo"/>
	</view>
</template>

<script>
    import TopNav from '@/components/topNav/topNav.vue'
	import TabBar from '@/components/tabBar/tabBar.vue'
	import LiveList from '../cus_pages/liveList/liveList.vue'
	import AttentLive from '../cus_pages/attentLive/atttentLive.vue'
	import MessageList from '../cus_pages/messageList/messageList.vue'
	import ShopCat from '../cus_pages/shopCat/shopCat.vue'
	import MyCenter from '../cus_pages/myCenter/myCenter.vue'
	
	export default {
		data(){
			return {
				navInfo: {
					title: '首页',
					id: 1
				}
			}
		},
		
		methods: {
			/* 获取子组件传递的信息*/
			getNavInfo: function(data) {
				this.navInfo = data
			}
		},
		components: {
			'top-nav': TopNav,
			'tab-bar': TabBar,
			'live-list': LiveList,
			'message-list': MessageList,
			'attent-live': AttentLive,
			'shop-cat': ShopCat,
			'my-center': MyCenter
		}
	}
</script>

