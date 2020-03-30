<template>
	<view>
		<issue 
		    :headPicValue="avatar"
		    @submit="submit" >
		</issue>
	</view>
</template>

<script>
	import Issue from '@/components/issue/myIssue.vue'
	export default {
		data() {
			return {
				avatar: "",
				order_id: ""
			}
		},
		onLoad(options) {
			this.avatar = 'http://' + this.$store.state.info.userInfo.avatar
			this.order_id = options.order_id
			// console.log(options.order_id, this.avatar)
		},
		methods: {
			// 发布评论
			async submit(options) {
				console.log(options.score, options.text)
				if(!options.score || !options.text) {
					this.$apis.msg("评论不能为空")
					return
				}
				const data = { 
					order_id: this.order_id,
				    uid: this.$store.state.info.uid,
					score: options.score,
					assess: options.text
				 }
				 const result = await this.$apis.finishAssess(data)
				 if(result.code === "000000") {
					 this.$apis.msg('评论完成')
					 this.$apis.prePage().loadData()
					 uni.navigateBack()
				 }
			},
			//监听分数
			scoreChange(score) {
				console.log(score)
				this.score = score
			}
		},
		components: {
			Issue
		}
	}
</script>

<style lang="scss">
  .avatar {
	  width: 60px;
	  height: 60upx;
	  border-radius: 50%;
  }
</style>
