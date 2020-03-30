<template>
	<view class="content">
		<view class="header">
			<text>登陆</text>
		</view>
		<view class="login">
			<view class="title">
				<text>请输入您的账号</text>
			</view>
			<view class="inputCode">
				<input
				  placeholder-class="place-input"
				  v-model="userinfo.cphone" 
				  type="number"  
				  placeholder="手机号" />
			</view>
			<view class="inputCode">
				<input
				   placeholder-class="place-input"
				   v-model="userinfo.cpassword" 
				   type="password" 
				   placeholder="密码" />
			</view>
			<view class="captcha">
			   	<input
			   	    placeholder-class="place-input"
			   	    v-model="userinfo.code" 
			   	    type="number" 
			   	    placeholder="图片验证码" />
			    <image :src="capturl" @click="reloadcheck" class="img-captcha"></image>
			</view>
	        <view class="links">
				<view @click="gotoForgetPassword">忘记密码</view>
				<view @click="gotoRegister">快速注册</view>
			</view>
			<button class="login-btn" size="default" @click="login">登陆</button>
		</view>
		
	</view>
</template>
<script>
	import md5 from '@/common/js-md5/src/md5.js'
	import { mapMutations } from 'vuex'
	import config from '../../config/index.config.js'
	
	export default {
		data() {
			return {
				capturl: config.baseURL+'/user/login/captcha?flag=1',
				userinfo: {
					cphone: '',
					cpassword: '',
					code: ''
				}
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			...mapMutations(['setLoginState']),
			// 页面初始化
			init() {
				this.reloadcheck()
				this.userinfo = {
					cphone: '',
					cpassword: '',
					code:''
				}
				
			},
			/**
			 * 登陆接口
			 */
		    async login () {
				const userinfo = JSON.parse(JSON.stringify(this.userinfo))
				const result = await this.$apis.postLogin(userinfo)
				if(result.code === '000000') {
					// 设置登陆状态
					this.setLoginState(result.data)
					uni.reLaunch({
						url: '/pages/cus_pages/home/home'
					})
				} else if( result.code === "000005" ) {
					this.reloadcheck()
					this.$apis.msg(result.msg)
				} else {
					this.init()
					this.$apis.msg(result.msg)
				}
			},
		    /**
			 * 	加载图片
			 */
			reloadcheck: function() {
				this.capturl = config.baseURL+'/user/login/captcha?flag='+Math.random()
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

<style lang="scss">
	page {
		background: $color-login;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.header {
			position: fixed;
			top: 80upx;
			text {
				color: #FFFFFF;
				font-size: 38upx;
			}
		}
		.login {
			margin-top: 400upx;
			width: 85%;
			height: 450upx;
			padding: 25upx 40upx;
			background: #FFFFFF;
			border-radius: 10px;
			box-shadow: 0 0 10px #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			.title {
				font-size: 40upx;
				color: $font-color-dark;
			}
			.place-input {
				font-size: 30upx;
			}
			.inputCode {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				height: 76upx;
				width: 600upx;
				margin-top: 15upx;
				input {
					background: #E5E5E5;
					border-radius: 10upx;
					width:100%;
					height: 100%;
					padding-left: 20upx;
				}
				
			}
			.captcha{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				height: 76upx;
				width: 600upx;
				margin-top: 15upx;
				input {
					width: 200upx;
					background: #E5E5E5;
					// border: 1px solid #000000;
					border-radius: 10upx;
					height: 76upx;
					padding-left: 20upx;
				}
				.img-captcha {
				    width: 200upx;
				    height: 76upx;
					// border: 1px solid;
					background: #EEEEEE ;
				}
			}
			.links {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				font-size: 30upx;
				color: #999999;
				margin-top: 15upx;
				height: 76upx;
				width: 600upx;
			}
			.login-btn {
				width: 600upx;
				height: 76upx;
				background: $color-login;
				color: #FFFFFF;
				font-size: 30upx;
			}
		}
	}
</style>
