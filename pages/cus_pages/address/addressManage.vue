<template>
	<view class="content">
		<nav-bar 
		    backgroundColor="#ed1c24" 
			color="#FFFFFF"
			leftIcon="back"
			:title="title" 
			:isShowRight="showright" 
			rightIcon="trash" 
			@click-right="deleteBtn" ></nav-bar>
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressData.addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="parseInt(addressData.isDefault) === 1" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import NavBar from '@/components/zolysoft-nav-bar/zolysoft-nav-bar.vue'
	export default {
		data() {
			return {
				title: "",
				showright: false,
				addressData: {
					id: "",
					uid: "",
					name: '',
					mobile: '',
					addressName: '在地图选择',
					address: '',
					area: '',
					// isDefault: false
				}
			}
		},
		components: {
			NavBar
		},
		onLoad(option){
			this.title = '新增收货地址';
			if(option.type==='edit'){
				this.title = '编辑收货地址'
				this.showright = true
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
		},
		methods: {
			async switchChange(e){
				const data = {
					id: this.addressData.id, 
					uid: this.addressData.uid, 
					isDefault: e.detail.value,
				}
				const result = await this.$apis.changedefault(data)
				if(result.code === "000000") {
					this.addressData.isDefault = e.detail.value;
					this.$apis.prePage().init()
				}
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			//提交
			async confirm(){
				let data = this.addressData;
				if(!data.name){
					this.$apis.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8|9][0-9]{9}$)/.test(data.mobile)){
					this.$apis.msg('请输入正确的手机号码');
					return;
				}
				// if(!data.address){
				// 	this.$apis.msg('请在地图选择所在位置');
				// 	return;
				// }
				if(!data.area){
					this.$apis.msg('请填写门牌号信息');
					return;
				}
				await this.submitAddress()
			},
			deleteBtn() {
				uni.showModal({
					content:"确定删除改地址吗",
					success: (e) => {
						if(e.confirm) {
							this.deleteAddress()
						} else if(e.cancel) {
							this.$apis.msg('取消删除')
						}
					}
				})
			},
			// 删除该地址
			async deleteAddress() {
				const data = { id: this.addressData.id, uid: this.addressData.uid}
				const result = await this.$apis.deleteAddressById(data)
				if(result.code === "000000") {
					this.$apis.msg('删除成功')
					this.$apis.prePage().init();
					uni.navigateBack()
				}
			},
			// 提交地址信息
			async submitAddress() {
				const action = this.manageType
				const uid = this.$store.state.info.uid
				const data = { action,...this.addressData, uid }
				const result = await this.$apis.updateOrCreate(data) 
				if(result.code === "000000") {
					this.$apis.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					this.$apis.prePage().init()
					uni.navigateBack()
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		// padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $color-primary;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
