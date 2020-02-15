<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const token = uni.getStorageInfoSync('token')
			if(!token) {
				uni.redirectTo({
					url: './pages/login/login'
				});
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE*/
	page{
		background-color: #EFEFF4;
	}
	/* #endif*/
	.main-content {
		position: absolute;
		top: 130upx;
		z-index: 0;
		margin: 0 0;
		margin-bottom: 130upx;
		padding: 0 24upx 0 24upx;
	}
</style>
