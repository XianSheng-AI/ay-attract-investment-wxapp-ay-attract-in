<template>
	<view class="container">
		<view class="bg-top">
			<view class="login-box" v-if="isLogin" @click="fixPhone">
				<view class="login-left">
					<image class="avatar" :src="userData.avatarUrl"></image>
					<view class="login-desc">
						<text class="com-desc">{{userData.nickName}}</text>
						<text class="com-desc">{{phone}}</text>
					</view>
				</view>
				<view class="login-right">
					<image class="login-icon" src="../../static/img/me/ic_back_right.png" mode="widthFix"></image>
				</view>
			</view>
			<view v-if="!isLogin" class="login-box com-desc loginBtn" 
			 withCredentials="true" @click="loginGo">
				<view class="login-left">
					<image class="avatar" ></image>
					<view class="login-desc">
						<view class="com-desc loginBtn">点击登录</view>
					</view>
				</view>
				<view class="login-right">
					<image class="login-icon" src="../../static/img/me/ic_back_right.png" mode="widthFix"></image>
				</view>
			</view>

		</view>
		<view class="tips" v-if="!isLogin">
			<image src="" mode=""></image>
		</view>
		<view class="menu-box" v-if="isLogin">
			<view class="menu-item" @click="apply">
				<view class="item-left">
					<image class="menu-icon" src="../../static/img/me/ic_form.png" mode="widthFix"></image>
					<text class="menu-name">我的申请</text>
				</view>
				<image class="loog-icon" src="../../static/img/index/ic_back.png" mode="widthFix"></image>
			</view>
			<view class="menu-item" @click="shouM">
				<view class="item-left">
					<image class="menu-icon" src="../../static/img/me/ic_collection.png" mode="widthFix"></image>
					<text class="menu-name">我的收藏</text>
				</view>
				<image class="loog-icon" src="../../static/img/index/ic_back.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../api/api.js'
	import local from '../../common/local.js'
	export default {
		data() {
			return {
				isLogin: false,
				userData: {},
				phone: ''
			}
		},
		onLoad(option) {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage", "shareTimeline"]
			})
		},

		onShow() {
			let userInfo = local.localStorage.get('userInfo');
			let phoneInfo = local.localStorage.get('phoneInfo');
			if (!userInfo && typeof(userInfo) != "undefined" && userInfo != 0) {
			} else {
				this.userData = JSON.parse(userInfo);
				let phone = JSON.parse(phoneInfo).phone;
				this.phone = phone;
				this.isLogin = true;
			}

		},

		methods: {
			loginGo(){
				uni.navigateTo({
					url:'../login/authorize'
				})
			},
			loginM() {
				if (this.isLogin) {
					uni.navigateTo({
						url: '../fixPhone/fixPhone'
					})
				} else {
					this.wxGetUserInfo();
				}
			},
			fixPhone() {
				uni.navigateTo({
					url: '../fixPhone/fixPhone'
				})
			},
			apply() {
				uni.navigateTo({
					url: '../apply/apply'
				})
			},
			shouM() {
				uni.navigateTo({
					url: '../collection/collection'
				})
			},
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
				that.userData = res.detail.userInfo;
				local.localStorage.set('userInfo', JSON.stringify(res.detail.userInfo))

				uni.navigateTo({
					url: '../login/login',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background: #f0f2f5;
		width: 100%;
		height: 100%;

		.bg-top {
			height: 200rpx;
			background: linear-gradient(to bottom, #0191D7, #54C2F0);
			overflow: hidden;
			display: flex;

			.loginBtn {
				display: block;
				font-size: 30rpx;
				background-color: unset;
				box-sizing: content-box;
				width: 400rpx;
				text-align: left;
				color: #fff;
				&::after {
					border: none;
				}
			}

			.login-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 88%;
				padding: 0 34rpx;
				margin: 28rpx auto;

				.login-left {
					display: flex;
					align-items: center;
					.avatar {
						margin-right: 26rpx;
						width: 90rpx;
						height: 90rpx;
						background: #fff;
						border-radius: 200rpx;
					}
					.login-desc {
						color: #fff;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						font-size: 30rpx;

						.loginBtn {
							display: block;
							font-size: 30rpx;
							background-color: unset;
							box-sizing: content-box;
							width: 400rpx;
							text-align: left;
							color: #fff;

							// padding-right: 40%;
							&::after {
								border: none;
							}
						}
					}
				}

				.login-right {
					.login-icon {
						width: 27rpx;
					}
				}
			}
		}

		.menu-box {
			.menu-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 25rpx 28rpx;
				background-color: #fff;
				margin-bottom: 4rpx;

				.item-left {
					display: flex;
					justify-content: center;
					align-items: center;

					.menu-icon {
						width: 44rpx;
						margin-right: 14rpx;
					}

					.menu-name {
						font-size: 32rpx;
						color: #333;
					}
				}

				.loog-icon {
					width: 17rpx;
				}
			}
		}
	}
</style>
