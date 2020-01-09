<template>
	<view class="content">
		<view class="uni-form-item">
		   <input 
		     type="text" 
			 class="uni-input" 
			 @blur="checkName" 
			 placeholder="请输入您的昵称" 
			 v-model="userInfo.cname"
			 />
		</view>
		<view class="uni-form-item">
		   <input 
			 class="uni-input" 
			 placeholder="请输入手机号" 
			 @blur="checkTel" 
			 v-model="userInfo.cphone"
			 />
		</view>
		<view class="column-with-btn">
			<view class="uni-form-item checkinput">
				<input 
				  type="text" 
				  class="uni-input" 
				  placeholder="请输入验证码" 
				  v-model="userInfo.mobileCode">
			</view>
			<button 
			  :class="{ active: disableCodeBtn }" 
			  :disabled="!disableCodeBtn" 
			  @tap="sendCode"
			 >{{ codeBtn.text }}</button>
		</view>
		<view class="uni-form-item">
			<input 
			  type="password" 
			  class="uni-input"
			  placeholder="请输入密码"
			  v-model="userInfo.cpassword" />
		</view>
		<view class="uni-form-item">
			<input 
			  type="password" 
			  class="uni-input"
			  placeholder="确认密码"
			  v-model="repassword" />
		</view>
		<button type="primary" @click="register">注册</button>
		<view class="links">
		  已有账号？
		  <view class="link-highlight" @tap="gotoLogin">点此登陆</view>
		</view>
	</view>
</template>

<script type="text/javascript">
	import md5 from '../../node_modules/js-md5'
	
	export default {
		data() {
			return {
				userInfo: {
					cname: '',
					cphone: '',                 // 用户手机号
					mobileCode: '',             // 手机验证码
					cpassword: ''               // 密码
				},
				repassword: '' ,                // 确认密码
				format: false,                  // 手机格式
				seconds: 60, 
				codeBtn: {
					text: '获取验证码',
					waitingCode: true,
					count: this.seconds
				}
			}
		},
		onLoad() {
			//页面生命周期函数
		},
		methods: {
			/**
			 * 发送短信验证码
			 */
			sendCode: async function() {
				this.checkTel()
				if(!this.format) {
					uni.showToast({
						title:'手机格式不正确',
						icon: 'none',
						duration: 1500
					})
					return
				}
				this.codeBtn.waitingCode = false
				this.codeBtn.count = this.seconds
				this.codeBtn.text = this.codeBtn.count + 's'
				let countdown = setInterval(() => {
					this.codeBtn.count--
					this.codeBtn.text = this.codeBtn.count + 's'
					if(this.codeBtn.count === 0) {
						clearInterval(countdown)
						this.codeBtn.text = '重新发送'
						this.codeBtn.waitingCode = true
					}
				}, 1000)
				const result = await this.$apis.getMsgCode({
					cphone: this.userInfo.cphone
				})
				if(result.code === '000000') {
					uni.showToast({
						title:'发送成功',
						duration: 2000
					})
				} else {
					uni.showModal({
						content: result.data.toString()
					})
				}
			},
			/**
			 * 跳转登陆页面
			 */
			gotoLogin: function() {
				uni.navigateTo({ url: 'login'})
			},
			/**
			 * 验证用户名是否已被注册
			 */
			checkName: async function() {
				if(!this.userInfo.cname) {
					uni.showModal({
						content: '用户名必填'
					})
				} 
			},
			/**
			 * 检查手机格式
			 */
			checkTel: function() {
				const pattern = new RegExp(/^1[3456789]\d{9}$/)
				if(!this.userInfo.cphone) {
					uni.showModal({
						content: '手机号为空'
					})
					this.format = false
					return;
				}
				if(!pattern.test(this.userInfo.cphone)) {
					uni.showModal({
						content: '手机号格式错误'
					})
					this.format = false
					return;
				} else {
					this.format = true
				}
			},
			/**
			 * 手机注册
			 */
			register: async function() {
				if(this.userInfo.cpassword !== this.repassword) {
					uni.showModal({
						content: '密码不一致，重新输入',
					})
					this.repassword = ''
					this.userInfo.cpassword = ''
					return;
				}
				this.userInfo['cpassword'] = md5(this.repassword)
				const result = await this.$apis.postRegister(this.userInfo)
				if(result.code === '000000' ) {
					this.gotoLogin()
					uni.showToast({
						title:'注册成功，重新登陆',
					    position: 'center',
						duration: 500
					})
				} else {
					uni.showModal({
						content: '注册失败，请重新注册'
					})
				}
			}
		},
		computed:{
			/**
			 * 控制验证码按钮
			 */
			disableCodeBtn: function() {
				return this.codeBtn.waitingCode
			}
		}
	}
</script>
<style lang="scss" scoped>
  .content {
	  margin-top: 20%;
	  padding:100upx;
  }
  .logo {
	  text-align: center;
	  image {
		  width: 200upx;
		  height: 200upx;
		  margin-bottom: 40upx;
	  }
  }
  .uni-form-item {
	  margin-bottom: 40upx;
	  padding: 0;
	  border: 1px solid #e3e3e3;
	  box-shadow: 0 0 10upx #e3e3e3;
	  border-radius: 60upx;
	  .uni-input {
		  font-size: 30upx;
		  padding: 7px 20upx;
	  }
  }
  .column-with-btn {
	  display: flex;
	  flex: row;
	  justify-content: space-between;
	  align-content: center;
	  .checkinput {
		  width: 250upx;
		  margin-right: 50upx;
	  }
	  button {
		  padding: 0;
		  font-size: 30upx;
		  margin: 0;
		  width: 180upx;
		  height: 80upx;
		  text-align: center;
		  &:after {
			  border: none;
		  }
		  &.active {
			  background-color: $color-primary;
			  color: $uni-text-color-inverse;
		  }
	  }
  }
  button[type="primary"] {
  		  background-color: $color-primary;
		  box-shadow: 0 0 10upx #e3e3e3;
		  border-radius: 60upx;
  		  font-size: 34upx;
  		  margin-top: 60upx;
  }
  .links {
	  text-align: center;
	  margin-top: 40upx;
	  font-size: 26upx;
	  color: #999999;
	  view {
		  display: inline-block;
		  vertical-align: top;
		  margin: 0 10upx;
	  }
	  .link-highlight {
		  color: $color-primary;
	  }
  }
</style>
