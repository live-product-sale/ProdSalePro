<template>
	<view class="content">
		<view class="uni-form-item">
			<input 
			  class="uni-input" 
			  v-model="userinfo.cphone" 
			  type="text" 
			  placeholder="账号名称">
		</view>
		<view class="uni-form-item">
			<input 
			  class="uni-input" 
			  v-model="userinfo.cpassword" 
			  type="password" 
			  placeholder="密码" />
		</view>
		<view class="checkgroup">
			<view class="uni-form-item checkinput ">
				<input 
				  class="uni-input" 
				  v-model="userinfo.code" 
				  type="number" 
				  placeholder="图片验证码" >
			</view>
			<image 
			  ref="image" 
			  @tap="reloadcheck" 
			  class="img-captcha" 
			  :src="capturl"></image>
		</view>
		<view>
			<button type="primary" @click="login">登陆</button>
		</view>
		<view class="links">
			<view 
			  class="link-highlight" 
			  @click="gotoForgetPassword">忘记密码</view> ｜ 
			<view 
			  class="link-highlight"
			  @click="gotoRegister">注册账号</view>
		</view>
		<view class="links link-footer">
			<view class="link-highlight">快捷方式登陆>></view>
		</view>
	</view>
</template>
<script>
	import md5 from '../../node_modules/js-md5'
	
	export default {
		data() {
			return {
				capturl: 'http://49.235.51.111:3000/api/v1/user/login/captcha?flag=1',
				userinfo: {
					cphone: '',
					cpassword: '',
					code: ''
				}
			}
		},
		methods: {
			/**
			 * 登陆接口
			 */
			login: async function() {
				this.userinfo['cpassword'] = md5(this.userinfo.cpassword)
				const result = await this.$apis.postLogin(this.userinfo)
				if(result.code === '000000') {
				    uni.setStorageSync('uid', result.data.uid)
					uni.reLaunch({
						url: '../index/index'
					})
				} else {
					uni.showToast({
						title: result.msg,
						icon: 'none'
					})
				}
			},
		    /**
			 * 	加载图片
			 */
			reloadcheck: async function() {
				this.capturl = 'http://49.235.51.111:3000/api/v1/user/login/captcha?flag='+Math.random()
			},
			/**
			 * 跳转忘记密码页面
			 */
			gotoForgetPassword: function() {
				uni.navigateTo({url: 'forget'})
			},
			/**
			 * 跳转注册页面
			 */
			gotoRegister: function() {
				uni.navigateTo({url: 'register'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin-top: 20%;
		padding: 100upx;
	}
	.checkgroup {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.uni-form-item {
		margin-bottom: 40upx;
		border: 1px solid #e3e3e3;
		box-shadow: 0 0 10upx #e3e3e3;
		border-radius: 60upx;
		height: 70upx;
		.uni-input {
			font-size: 30upx;
			padding: 7px 20px;
		}
	}
	.img-captcha {
	    width: 200upx;
	    height: 70upx;
	}
	.checkinput{
		width: 250upx;
		margin-right: 50upx;
	}
	button[type="primary"] {
		background-color: $color-primary;
		border-radius: 60upx;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links {
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view {
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight {
			color: $color-primary;
		}
		.link-footer {
			position: fixed;
			bottom: 0;
		}
	}	
</style>
