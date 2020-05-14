<template>
	<view>
		<nav-bar
		  leftIcon="back"
		  leftText="返回"
		  title="店铺"
		  backgroundColor="#ed1c24"
		  color="#FFFFFF"></nav-bar>
	    <Category 
		  :categoryList="categoryList" 
		  :subCategoryList="subCategoryList"
		  activeTextColor="#ffffff"
		  activeBackgroundColor="#ed1c24"
		  @categoryMainClick="categoryMain" 
		  @categorySubClick="categorySub"></Category>
	</view>
</template>

<script>
	import Category from "@/components/qiyue-category/qiyue-category.vue"
	import NavBar from '@/components/zolysoft-nav-bar/zolysoft-nav-bar.vue'
	
	export default {
		components: {
			Category,
			NavBar
		},
		onLoad(options) {
			console.log(options)
			this.shop_id = options.shop_id
			this.init()
		},
		data() {
			return {
				shop_id : "",
				categoryList:[],
				subCategoryList: []
			}
		},
		methods: {
			// 页面初始化
			init() {
				this.getGoodsByShop()
			},
			categoryMain(category){
				this.subCategoryList = category.subCategoryList;
			},
			categorySub(category){
				console.log(category);
			},
			// 根据商店获取商品信息
			async getGoodsByShop() {
				const data = { shop_id: this.shop_id }
				const result = await this.$apis.getGoodsByShopId(data)
				if(result.code === "000000") {
					this.categoryList.push({ "name": "全部", "subCategoryList": result.data})
					this.subCategoryList = this.categoryList[0].subCategoryList;
				}
			}
		}
	}
</script>

<style>

</style>
