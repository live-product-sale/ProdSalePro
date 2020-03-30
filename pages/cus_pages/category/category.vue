<template>
	<view class="content">
		<nav-bar
		  leftIcon="back"
		  leftText="返回"
		  :title="Title"
		  color="#FFFFFF"
		  backgroundColor="#ed1c24"
		></nav-bar>
		<wuc-tab :tab-list="tabList" :tabCur.sync="tabCurrentIndex" @change="tabChange"></wuc-tab>
		<swiper
			:indicator-dots="false"
			:autoplay="false"
			:current="tabCurrentIndex"
			:duration="300"
			class="swiper-box"
			@change="changeTab">
				<swiper-item class="item" v-for="(item, index) in tabList" :key="item.id">
					<scroll-view scroll-y="true" refresher-enabled="true" 	@scrolltolower="loadMoreData">
						<live-list :liveList="liveList"></live-list>
						<uni-load-more :status="loadStatus" :showIcon="'true'" :iconType="'circle'"></uni-load-more>
					</scroll-view>
				</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import NavBar from '@/components/zolysoft-nav-bar/zolysoft-nav-bar.vue'
	import LiveList from '@/components/livelist/livelist.vue'
	import WucTab from '@/components/wuc-tab/wuc-tab.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	
	export default {
		data() {
			return {
				  Title: '品质水果',
				  tabCurrentIndex: 0,
				  tabList: [],
				  range_id: 0,
				  sort_id: 0,
				  liveList: [],
				  loadStatus: "noMore"
			}
		},
		onLoad(data) {
			// console.log(data)
			this.Title = data.range
		    this.range_id = data.range_id
			this.init()
		},
		methods: {
			// 页面初始化
			init() {
				this.getRangeTabInfo(this.range_id)
				this.getLive()
			},
			// 点击某个种类
			tabChange(index) {
				this.tabCurrentIndex = index
				this.getLive()
			},
			// 滑动屏幕，改变某个类别
			changeTab(e) {
				this.tabCurrentIndex = e.detail.current
				// console.log(e.detail.current)
				this.getLive(this.tabList[this.tabCurrentIndex].id)
			},
			// 获取某个范围的类型
			async getRangeTabInfo(id) {
				const result = await this.$apis.getTabInfo({range_id: id})
				if(result.code === "000000") {
					this.tabList = result.data
				}
			},
			// 获取某个类别的直播间
			async getLive(sort_id) {
				// console.log(sort_id)
				let data = {}
				if(!sort_id) {
					data = { range_id: this.range_id }
				} else {
					 data = { range_id: this.range_id, sort_id: sort_id}
				}
				const result = await this.$apis.getLiveByRangeAndSort(data)
				if(result.code === "000000") {
					// console.log(result)
					this.liveList = result.data
				}
			},
			// 加载更多数据
			async loadMoreData() {
				let data = {}
				this.loadStatus = "loading"
				if(!sort_id) {
					data = { range_id: this.range_id }
				} else {
					 data = { range_id: this.range_id, sort_id: sort_id}
				}
				const result = await this.$apis.getLiveByRangeAndSort(data)
				if(result.code === "000000" && result.data.length!== 0) {
					this.liveList.concat(result.data)
				}
				this.loadStatus = "noMore"
			}
		},
		components: {
			NavBar,
			LiveList,
			WucTab,
			uniLoadMore
		}
	}
</script>

<style lang="scss">
	page, .content{
		position: relative;
		height: 100%;
		.swiper-box {
			height: calc(100% - 120px);
			.item {
				height: auto;
			}
		}
	}
</style>
