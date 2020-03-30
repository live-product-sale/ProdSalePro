<template>
	<view class="content">
		<view class="uni-form-item">
		   <input 
			 class="uni-input" 
			 placeholder="请输入手机号" 
			 maxlength="11"
			 :disabled="!disableCodeBtn"
			 type="number"
			 @blur="checkTel" 
			 v-model="userInfo.cphone"
			 />
		</view>
		<view class="column-with-btn">
			<view class="uni-form-item checkinput">
				<input 
				  class="uni-input" 
				  type="number" 
				  placeholder="请输入验证码" 
				  v-model="userInfo.mobileCode" />
			</view>
			<button 
			  :class="{ active: disableCodeBtn }" 
			  :disabled="!disableCodeBtn" 
			  @click="sendCode"
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
		<button class="register"  @click="register">注册</button>
		<view class="links">
		  已有账号？
		  <view class="link-highlight" @click="gotoLogin">点此登陆</view>
		</view>
	</view>
</template>

<script type="text/javascript">
	import md5 from '@/common/js-md5/src/md5.js'
	
	export default {
		data() {
			return {
				userInfo: {
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
			// 页面初始化
			init() {
				this.userInfo = {
					cphone: '',
					mobileCode: '',
					cpassword: ''	
				}
			},
			/**
			 * 发送短信验证码
			 */
			sendCode: async function() {
				this.checkTel()
				if(!this.format) {
					uni.showToast({
						title:'手机格式不正确',
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
				uni.redirectTo({ url: 'login'})
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
				const userInfo = JSON.parse(JSON.stringify(this.userInfo))
				const result = await this.$apis.postRegister(userInfo)
				console.log(result)
				if(result.code === '000000' ) {
					this.gotoLogin()
					uni.showToast({
						title:'注册成功，重新登陆',
					    position: 'center',
						duration: 500
					})
				} else {
					this.init()
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
<style lang="scss">
	page {
		background: $color-login;
	}
  .content {
	  margin-top: 20%;
	  padding:100upx;
	  margin: 20% 20upx;
	  background: #FFFFFF;
	  border-radius: 10upx;
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
	  border-radius: 10upx;
	  .uni-input {
		  font-size: 30upx;
		  padding: 7px 20upx;
		  background: #E5E5E5;
		  color: #000000;
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
			  background: $color-login;
			  color: $uni-text-color-inverse;
		  }
	  }
  }
  .register {
  		  background: $color-login;
		  box-shadow: 0 0 10upx #e3e3e3;
		  // border-radius: 60upx;
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
		  color: $color-login;
	  }
  }
</style>
