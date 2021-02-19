<template>
	<view class="page">
		<view class="login-box" >
			<image class="avatar" src="../../static/img/login/144x144.png" mode="widthFix"></image>
			<text class="tips">欢迎使用奥园招商</text>
			<button  class="getBtn loginBtn" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">授权登录</button>
			<!-- <button class="getBtn" type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumber">获取手机号码注册</button> -->
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
				userData: {},
				WX_AUTH_URL: 'https://api.weixin.qq.com/sns/jscode2session',
				jsCode: '',
			}
		},
		onShow() {
			// let userInfo = JSON.parse(local.localStorage.get('userInfo'));
			// console.log(userInfo);
			// this.userData = userInfo;
			// wx.showShareMenu({
			// 	withShareTicket: true,
			// 	menus: ["shareAppMessage", "shareTimeline"]
			// })
		},
		onLoad: function() {
			// var that = this;
			// let userInfo = JSON.parse(local.localStorage.get('userInfo'));
			
			// console.log(userInfo);
			// this.userData = userInfo;
			// uni.login({
			// 	success: function(res) {
			// 		console.log(res)
			// 		that.jsCode = res.code;
			// 	}
			// });
			// this.initPhone();
		},
		methods: {
			wxGetUserInfo(res) {
				
				let that = this;
				console.log(res)
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}
				uni.showLoading({
					title:'授权中...'
				})
				that.userData = res.detail.userInfo;
				local.localStorage.set('userInfo', JSON.stringify(res.detail.userInfo))
				that.initPhone();
			},
			
			getPhone() {
				api.getPhone().then(res => {
					console.log(res)
					if (res.code === 0) {
						let phoneInfo = {
							phone: res.data,
							isLogin: true
						}
						uni.hideLoading()
						local.localStorage.set('phoneInfo', JSON.stringify(phoneInfo));
						uni.navigateBack()
					} else {
						uni.hideLoading()
						uni.navigateTo({
							url:'./login'
						})
					}
				})
			},
			bindPhone(phone) {
				let phoneInfo = {
					phone: phone,
					isLogin: true
				}
				api.bindPhone({
					phone: phone
				}).then(res => {
					if (res.code === 0) {
						uni.showToast({
							title: '手机号绑定成功!',
							icon: "none",
							position: 'bottom'
						});
						local.localStorage.set('phoneInfo', JSON.stringify(phoneInfo));
						uni.navigateBack();
						
					} else if (res.code === 1) {
						uni.showToast({
							title: '手机号绑定失败!',
							icon: "none",
							position: 'bottom'
						});
					}
				})
			},
			initPhone() {
				let that = this;
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
								local.localStorage.set('token', res.data.token)
								local.localStorage.set('session_key', res.data.session_key)
								that.getPhone();
							}
						})
					}
				});
			},
			getPhoneNumber(e) {
				let that = this;
				let wx_author_url = this.WX_AUTH_URL + '?appid=' + base.AppId + '&secret=' + base.AppSecret + '&js_code=' + this.jsCode +
					'&grant_type=authorization_code';
				let maid = local.localStorage.get('maid');
				console.log('maid', maid)
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
								local.localStorage.set('token', res.data.token)
								let sessionKey = res.data.session_key;
								let pc = new WXBizDataCrypt(base.AppId, sessionKey);
								let data = pc.decryptData(e.target.encryptedData, e.target.iv);
								let phoneInfo = {
									phone: data.phoneNumber,
									isLogin: true
								}
								api.bindPhone({
									phone: phoneInfo.phone
								}).then(res => {
									if (res.code === 0) {
										uni.showToast({
											title: '手机号绑定成功!',
											icon: "none",
											position: 'bottom'
										});

									} else if (res.code === 1) {
										uni.navigateBack();
									}
									local.localStorage.set('phoneInfo', JSON.stringify(phoneInfo));
									uni.navigateBack();
								})

							}
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
				width: 200rpx;
				height: 200rpx;
				// border-radius: 200rpx;
				// background-color: red;
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
				line-height: 90rpx;
				background: #0191D7;
				color: #FFFFFF;
				border-radius: 200rpx;
			}
		}
	}
</style>
