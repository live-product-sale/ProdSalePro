<template>
	<view >
		<nav-bar 
		    title="首页"
			color="#FFFFFF"
			backgroundColor="#ed1c24"
			rightIcon="videocam"
			@click-right="toShopClient"
			rightIconSize="40"
			></nav-bar>
		<view class="main-content">
			<!-- 轮播图展示 -->
			<swiper-live :speciaLive="speciaLive" />
			<!-- 商品分类 -->
			<category />
		</view>
		<view class="title">
			<image src="../../../static/categoryimg/recommend.png" mode=""></image>
			<text>精品推荐</text>
		</view>
		<view class="live-content">
			<!-- 直播列表展示 -->
			<live-list :liveList="liveList"></live-list>
		</view>
		<!-- 上拉加载 -->
		<uni-load-more :status="status" :showIcon="showIcon" :iconType="'circle'"></uni-load-more>
	</view>
</template>

<script>
	import Category from '@/components/category/category.vue'
	import SwiperLive from '@/components/swiper/swiper.vue'
	import LiveList from '@/components/livelist/livelist.vue'
	import SearchVideo from '@/components/searvideo/searvideo.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniIcon from "@/components/uni-icons/uni-icons.vue"
	import NavBar from "@/components/zolysoft-nav-bar/zolysoft-nav-bar.vue"

	export default {
		onLoad() {
			this.init()
		},
		data() {
			return {
				liveList: [],   // 直播列表数据
				speciaLive: [], // 轮播图数据,
				offset: 0,      // 偏移量
				limit: 10,      // 获取数据量
				status: 'loading',
				showIcon: true,	
			}
		},
		methods: {
			// 页面初始化
			async init() {
				this.status = 'loading'
				this.showIcon = true
				this.offset = 0      // 偏移量
				this.limit = 10      // 获取数据量
				const specData = await this.$apis.getLiveList({ offset: 0, limit: 3 })
				if(specData.code === "000000") {
					this.speciaLive = specData.data
				}
				const data = { offset: this.offset, limit: this.limit }
				this.getLiveList(data)
			},
			// 跳转商家端
			toShopClient() {
				this.$apis.msg("进入商家端")
				uni.navigateTo({
					url: "/pages/bus_pages/index/index"
				})
			},
			// 加载更多
			async getLiveList(params) {
				const result = await this.$apis.getLiveList(params)
				if(result.code === "000000") {
					if(result.data.length === 0) {
						this.status = 'noMore'
						this.showIcon = false
						return;
					}
					this.liveList = Array.prototype.concat.apply([], result.data)
				}
			},
		},
		components: {
			SwiperLive,
			SearchVideo,
			LiveList,
			Category,
			uniLoadMore,
			uniIcon,
			NavBar
		},
		onPullDownRefresh() {
			this.$apis.debounce(this.init(), 300)
			uni.stopPullDownRefresh()
		},
		onReachBottom() {
			this.offset +=10
			const params = { offset: this.offset, limit: this.limit }
			this.$apis.debounce(this.getLiveList(params), 300)
		}
	}
</script>

<style lang="scss">
	.live-content {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 0 10upx;
	}
	.title {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		margin: 10px 0;
		image {
			width: 50upx;
			height: 50upx;
		}
	}
</style>
