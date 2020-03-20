<template>
	<view>
		<nav-bar
		    leftIcon="back"
		    leftText="返回"
			rightIcon="compose"
			@click-right="edit"
			rightText="编辑"
		    title="个人资料"
		    color="#FFFFFF"
		    backgroundColor="#ed1c24"
		></nav-bar>
		<view class="userinfo">
			<view class="row">
				<text>用户id</text>
				<text>{{info.uid}}</text>
			</view>
			<view class="row" :class="{isEdit: !disabled }" @click="Popup">
				<text>头像</text>
				<image :src="'http://'+info.userInfo.avatar" mode="aspectFit" lazy-load="true"></image>
			</view>
			<view class="row" :class="{isEdit: !disabled }">
				<text>昵称</text>
				<input 
				    type="text" 
					class="name" 
					v-model="info.userInfo.name"
					placeholder-class="placeholder-name"
					placeholder="输入昵称" 
					:disabled="disabled"/>
			</view>
			<view class="row" :class="{isEdit: !disabled }">
				<text>性别</text>
				<picker mode="selector" :disabled="disabled" :value="index" :range="genderRange" @change="changeGender">
					<text>{{genderRange[index]}}</text>
				</picker>
			</view>
			<view class="row">
				<text>手机号</text>
				<text>{{info.cphone}}</text>
			</view>
			<button class="submit" @click="submit" :disabled="disabled">保存</button>
		</view>
		<uni-popup ref="popup"  type="bottom">
			<view class="pic-btn">
			    <button type="default" @click="takePhoto">拍照选择</button>
				<button type="default" @click="checkImage">相册选择</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import NavBar from '@/components/zolysoft-nav-bar/zolysoft-nav-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import upImg  from '@/common/uploadImage.js'
	import { mapMutations, mapState } from 'vuex'
	
	export default {
		data() {
			return {
				disabled: true,
				index: 0,
				genderRange: ['男', '女']
			}
		},
		computed: mapState(["info"]),
		onLoad() {
			this.init()
			console.log(this.info)
		},
		methods: {
			// 页面初始化
			init() {
			},
			// 点击编辑
			edit() {
				this.disabled = false
			},
			// 选择性别
			changeGender(e) {
				this.index = e.detail.value
				this.info.userInfo["gender"] = this.genderRange[e.detail.value]
			},
			// 提交修改信息
			async submit() {  
				this.disabled = true
				const data = this.info.userInfo
				const result = await this.$apis.perfectUserInfo(data)
				if(result.code === "000000") {
					uni.showToast({
						title: '保存成功'
					})
				}	
			},
			// 换头像
			Popup() {
				if(!this.disabled) {
					this.$refs.popup.open()
				}
			},
			// 选择图片
			checkImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], 
					sourceType: ['album'],  
					success: async (res) => {
						uni.showLoading({
							title: "正在上传"
						})
						const filePath = res.tempFiles[0].path;
						const urlArray = filePath.split("/")
						const fileName = urlArray[urlArray.length - 1]
						const result = await upImg(fileName, filePath)
						console.log(result)
						if(result.statusCode === 200) {
							uni.hideLoading()
							this.info.userInfo["avatar"] = result.Location
							console.log(this.avatar)
							uni.showToast({
								title: '上传成功'
							})
						} else {
							uni.hideLoading()
							uni.showToast({
								title: '上传失败'
							})
						}
					},	
				})
			},
			// 使用相机拍照
			takePhoto() {
				const camera = plus.camera.getCamera()
				const res = camera.supportedImageResolutions[0];
				const fmt = camera.supportedImageFormats[0];
				console.log("Resolution: "+res+", Format: "+fmt);
				camera.captureImage(async (path) => {
					const urlArray = path.split("/")
					const fileName = urlArray[urlArray.length - 1]
					uni.showLoading({
						title: '开始上传'
					})
					const result = await upImg(fileName, path)
					if(result.statusCode === 200) {
						console.log(result)
						this.info.userInfo["avatar"] = result.Location
						console.log(this.avatar)
						uni.hideLoading()
						uni.showToast({
							title: "上传成功"
						})
					} else {
						uni.hideLoading()
						uni.showToast({
							title: "上传失败"
						})
					}
				}, (error) => {
					console.log(error)
				}, {resolution:res,format:fmt})
			},
		},
		components: {
			NavBar,
			uniPopup
		}
	}
</script>

<style lang="scss">
   .userinfo {
	   width: 100%;
	   display: inline-block;
	   .row {
		   padding: 10upx 5%;
		   height: 100upx;
		   background: #FEFEFE;
		   overflow: hidden;
		   box-sizing: border-box;
		   display: flex;
		   align-items: center;
		   justify-content: space-between;
		   position: relative;
		   border-bottom: 1px solid #EFEFEF;
		   &:hover {
			   background: #F6F6F6 !important;
		   }
		   .name {
			   font-size: 28upx;
			   text-align: right;
			   color: $font-color-disabled;
		   }
		   .placeholder-name {
			   font-size: 28upx;
			   text-align: right;
			   color: $font-color-disabled;
		   }
		   text {
			   font-size: 28upx;
			   letter-spacing: 1px;
			   color: $font-color-disabled;
		   }
		   image {
			   width: 80upx;
			   height: 80upx;
			   border-radius: 8px;
		   }
	   }
	   .isEdit {
		   text {
			    color: $font-color-dark;
		   }
	   }
	   .submit {
		   margin-top: 30upx;
		   color: #FFFFFF;
		   width: 75% ;
		   border: 0;
		   background-color: $color-primary;
		   border: none;
	   }
	   .pic-btn {
		   width: 100%;
		   background: #FFFFFF;
		   height: 100px;
		   button {
			   border:  none;
		   }
	   }
   }
</style>
