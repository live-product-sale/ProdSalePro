<template>
	<view>
		引导页面
	    <!-- <top-nav :title="navInfo.title" :navId="navInfo.id" /> -->
		<!-- 首页 -->
		<!-- <template v-if="navInfo.id == 1 "> -->
			<!-- <home /> -->
		<!-- </template> -->
		<!-- 关注页面 -->
		<!-- <template v-else-if="navInfo.id == 2 "> -->
			<!-- <attent-live /> -->
		<!-- </template> -->
		<!-- 消息页面 -->
		<!-- <template v-else-if="navInfo.id == 3 ">
			<message-list />
		</template> -->
		<!-- 购物车页面 -->
		<!-- <template v-else-if="navInfo.id == 4 ">
		   <cart />
		</template> -->
		<!-- 个人中心页面 -->
	<!-- 	<template v-else-if="navInfo.id == 5 ">
			<personal-center :userInfo="{name: '章三'}" />
		</template> -->
		<!-- <tab-bar v-on:NavInfo="getNavInfo"/> -->
	</view>
</template>

<script>

	
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
	    onLoad() {
		}
	}
</script>

