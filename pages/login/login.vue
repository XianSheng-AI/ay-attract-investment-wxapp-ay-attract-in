<template>
	<view class="page">
		<view class="login-box">
			<image class="avatar" :src="userData.avatarUrl" mode="widthFix"></image>
			<text class="tips">您还没有注册</text>
			<button class="getBtn" type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">获取手机号码注册</button>
		</view>
	</view>
</template>

<script>
	import local from '../../common/local.js'
	import base from '../../api/base.js'
	import api from '../../api/api.js'
	import WXBizDataCrypt from './WXBizDataCrypt.js'
	export default {
		data() {
			return {
				isShow:false,
				userData: {},
				WX_AUTH_URL: 'https://api.weixin.qq.com/sns/jscode2session',
				jsCode: '',
				
			}
		},
		onShow() {
			let userInfo = JSON.parse(local.localStorage.get('userInfo'));
			this.userData = userInfo;
			wx.showShareMenu({
				withShareTicket:true,
				menus:["shareAppMessage","shareTimeline"]
			})
		},
		onLoad: function() {
			var that = this;
			let userInfo = JSON.parse(local.localStorage.get('userInfo'));
			console.log(userInfo);
			this.userData = userInfo;
		},
		methods: {
			getPhone(){
				api.getPhone().then(res=>{
					if(res.code===0){
						let phoneInfo = {
							phone: res.data,
							isLogin: true
						}
						local.localStorage.set('phoneInfo', JSON.stringify(phoneInfo));
						uni.navigateBack()
					}else{
						this.isShow=true;
						return;
					}
				})
			},
			bindPhone(phone){
				let phoneInfo = {
					phone: phone,
					isLogin: true
				}
				api.bindPhone({phone:phone}).then(res=>{
					if(res.code===0){
						uni.showToast({
							title: '手机号绑定成功!',
							icon: "none",
							position: 'bottom'
						});
						local.localStorage.set('phoneInfo', JSON.stringify(phoneInfo));
						uni.navigateBack();
						
					}else if(res.code===1){
						uni.showToast({
							title: '手机号绑定失败!',
							icon: "none",
							position: 'bottom'
						});
					}
					// local.localStorage.set('phoneInfo', JSON.stringify(phoneInfo));
					// uni.navigateBack();
				})
			},
			initPhone(){
				let that=this;
				let maid = local.localStorage.get('maid');
				uni.login({
					success: function(res) {
							that.jsCode = res.code;
							let params = {
								code: that.jsCode,
								avatarUrl: that.userData.avatarUrl,
								maid: maid,
								city: that.userData.city,
								gender: that.userData.gender,
								nickName: that.userData.nickName,
								province: that.userData.province
							}
							api.getToken(params).then(res => {
								if (res.code === 0) {
									local.localStorage.set('token',res.data.token)
									// let sessionKey = res.data.session_key;
									// let pc = new WXBizDataCrypt(base.AppId, sessionKey);
									// let data = pc.decryptData(e.target.encryptedData, e.target.iv);
									that.getPhone();
									
									
								}
							})
						// }
					}
				});
			},
			getPhoneNumber(e) {
				let that = this;
				let wx_author_url = this.WX_AUTH_URL + '?appid=' + base.AppId + '&secret=' + base.AppSecret + '&js_code=' + this.jsCode +
					'&grant_type=authorization_code';
				let maid = local.localStorage.get('maid');
				console.log('maid',maid)
				uni.login({
					success: function(res) {
							that.jsCode = res.code;
							let params = {
								code: that.jsCode,
								avatarUrl: that.userData.avatarUrl,
								maid: maid,
								city: that.userData.city,
								gender: that.userData.gender,
								nickName: that.userData.nickName,
								province: that.userData.province
							}
							let token=local.localStorage.get('token')
							let session_key=local.localStorage.get('session_key')
									let pc = new WXBizDataCrypt(base.AppId, session_key);
									let data = pc.decryptData(e.target.encryptedData, e.target.iv);
									let phoneInfo = {
										phone: data.phoneNumber,
										isLogin: true
									}
									api.bindPhone({phone:phoneInfo.phone}).then(res=>{
										if(res.code===0){
											uni.showToast({
												title: '手机号绑定成功!',
												icon: "none",
												position: 'bottom'
											});
											
										}else if(res.code===1){
											uni.showToast({
												title: '手机号绑定失败!',
												icon: "none",
												position: 'bottom'
											});
											uni.navigateBack();
										}
										local.localStorage.set('phoneInfo', JSON.stringify(phoneInfo));
										uni.switchTab({
											url:'../me/me'
										})
									})
					}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		.login-box {
			width: 70%;
			margin: 200rpx auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 200rpx;
				display: block;

			}

			.tips {
				color: #333;
				font-size: 30rpx;
				margin: 25rpx 0 137rpx;
			}

			.getBtn {
				width: 100%;
				height: 90rpx;
				background: #0191D7;
				border-radius: 200rpx;
			}
		}
	}
</style>
