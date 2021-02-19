<template>
	<view class="all-box">
		<view class="page" v-if="isHas">
			<view class="project-bg">
				<swiper :autoplay="true" :current="currentIndexBg" :circular="true" :interval="3000" :duration="100"
				 display-multiple-items=1 @change="swierChangeBg" class="swiper-empty-top">
					<swiper-item v-for="(item,i) in proInfo.img" :key="i">
						<image :src="item" class="slide-bg" :class="currentIndexBg === i?'active':''"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="top-desc">
				<view class="top-box">
					<view class="top-left">
						<text class="pro-name">{{proInfo.name}}</text>
						<text class="status open" v-if="proInfo.status==1">已开业</text>
						<text class="status ready" v-if="proInfo.status==2">筹备中</text>
						<text class="status close" v-if="proInfo.status==3">已关闭</text>
					</view>
					<view class="top-right">
						<button class="share" data-name="shareBtn" open-type="share" v-if="isLogin">
							<image class="share-icon" src="../../static/img/share/ic_share.png" mode="widthFix"></image>
							<text class="share-desc">分享</text>
						</button>
						<view class="share-btn-top" v-if="!isLogin" @click="shareM">
							<image class="share-icon" src="../../static/img/share/ic_share.png" mode="widthFix"></image>
							<text class="share-desc">分享</text>
						</view>

					</view>
				</view>
				<view class="gps-desc">{{proInfo.sub_name}}</view>
				<view class="pro-arg">
					<view class="pro-addre" @click="goMap">
						<view class="flex-box">
							<view class="flex-desc">项目地址：</view> <text class="add-desc">{{proInfo.address}}</text>
						</view>
						<image class="addre-icon" src="../../static/img/share/ic_map_smart.png" mode="widthFix"></image>
					</view>
					<view class="pro-arg-two">
						<text class="pro-area">项目面积：{{proInfo.area}}万㎡</text>
						<text class="peo-time" v-if="proInfo.status==1">开业时间：{{proInfo.open_time}}</text>
						<text class="peo-time" v-if="proInfo.status==2">计划开业时间：{{proInfo.open_time}}</text>
						<text class="peo-time" v-if="proInfo.status==3">计划开业时间：{{proInfo.open_time}}</text>
					</view>
				</view>
			</view>
			<view class="project-info">
				<view class="pro-title">项目概况</view>
				<view class="info-desc">
					<rich-text class="tichText" :nodes="proInfo.des.replace(/\<img/gi, '<img style=max-width:100%;height:auto')"></rich-text>
				</view>

				<view class="pro-title">项目位置</view>
				<view class="pro-map">
					<map class="map" :latitude="proInfo.lat" :longitude="proInfo.long" :markers="covers">
					</map>
				</view>
			</view>
			<view class="info-item">
				<view class="info-title">
					<view class="pro-title">业态分布</view>
					<view class="info-right" v-if="showArea">
						<picker @change="bindPickerChange" :value="index" :range="arrayArea" range-key="name">
							<view class="uni-input">{{arrayArea[index].name}}</view>
						</picker>
						<image class="sele-icon" src="../../static/img/project-img/ic_dowm.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="swiper-box">
					<view class="noMore" v-if="noMore">
						<view class="noMore-box" v-for="(item,i) in areaImg" :key="i" @click="showDiagram(item)">
							<image :src="item.img" class="slide-image" :class="currentIndex === i?'active':''"></image>
							<view class="swiper-name">{{item.floor}}</view>
						</view>
					</view>
					<view v-if="!noMore">
						<swiper :autoplay="false" :current="currentIndex" :circular="true" :duration="100" display-multiple-items=3
						 @change="swierChange" class="swiper-empty">
							<swiper-item v-for="(item,i) in areaImg" :key="i" @click="showDiagram(item)">
								<image :src="item.img" class="slide-image" :class="currentIndex === i?'active':''"></image>
								<view class="swiper-name">{{item.floor}}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="info-item">
				<view class="info-title">
					<view class="pro-title">品牌入驻</view>
					<view class="info-right" @click="changeView">
						{{lookDesc}}
						<image class="sele-icon" src="../../static/img/project-img/ic_dowm.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="brand" v-if="isShow">
					<view class="brand-item" v-for="(item,i) in proInfo.brand_img">
						<image :src="item" class="brand-bg" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="foo-left">
					<view class="left-item" @click="shouGo">
						<image class="footer-icon" :src="shouIconUrl" mode="widthFix"></image>
						<view>收藏</view>
					</view>
					<view class="right-item">
						<button class="share" data-name="shareBtn" open-type="share" v-if="isLogin">
							<image data-name="shareBtn" open-type="share" class="footer-icon" src="../../static/img/project-img/ic_share_big.png"
							 mode="widthFix"></image>
							<view class="share-desc">分享</view>
						</button>
						<view class="noLogin" v-if="!isLogin" @click="shareM">
							<image data-name="shareBtn" open-type="share" class="footer-icon" src="../../static/img/project-img/ic_share_big.png"
							 mode="widthFix"></image>
							<view class="share-desc">分享</view>
						</view>
					</view>
				</view>
				<view class="foo-right">
					<view class="btn-com quick" @click="connectUs">快速咨询</view>
					<view class="btn-com go-in" @click="goIn">我要入驻</view>
				</view>
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
				showArea: true,
				shouIconUrl: '../../static/img/project-img/xin.png',
				lookDesc: '展开',
				isHas: false,
				noMore: false,
				isLogin: false,
				currentIndex: 0,
				currentIndexBg: 0,
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.9085,
					longitude: 116.39747,
					clickable: true,
					iconPath: '../../static/img/map/address-icon.png',
					width: 20,
					height: 26,

					callout: { //自定义标记点上方的气泡窗口 点击有效  
						content: '', //文本
						color: '#ffffff', //文字颜色
						fontSize: 14, //文本大小
						borderRadius: 2, //边框圆角
						bgColor: '#0191D7', //背景颜色
						display: 'ALWAYS', //常显
						padding: 3,
					},
				}],

				isShow: true,

				isShou: false, //收藏
				proInfo: {},
				areaImg: [],
				arrayArea: [],
				index: 0,
				id: '',
				project_id: '',
			}
		},
		onShow() {
			wx.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			})
			this.initShare()
		},
		onLoad(option) {
			console.log(option)
			let _id = option.project_id;
			this.project_id = _id
			this.initData()
		},

		onShareAppMessage(res) {
			return {
				title: this.proInfo.name, // 分享名称
				path: 'pages/projectDetail/projectDetail?project_id=' + this.project_id, // 这里写你这个页面的路径
				imageUrl: this.proInfo.img[0], //这个是显示的图片，不写就默认当前页面的截图
				success: function(shareTickets) {
					console.log(shareTickets + '成功');
					// 转发成功
				},
				fail: function(res) {
					console.log(res + '失败');
					// 转发失败
				},
				complete: function(res) {
					// 不管成功失败都会执行
				}
			}

		},
		methods: {
			shareM() {
				uni.showToast({
					title: "您还未登录!",
					icon: "none",
					position: 'bottom'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '../login/authorize'
					})
				}, 1500)
			},

			goMap() {
				uni.navigateTo({
					url: '../map/map?mapInfo=' + encodeURIComponent(JSON.stringify(this.covers))
				})
			},
			initData() {
				uni.showLoading()
				api.projectDetail({
					project_id: this.project_id
				}).then(res => {
					console.log('res', res)
					if (res.code === 0) {
						this.isHas = true;
						this.covers[0].latitude = res.data.lat
						this.covers[0].longitude = res.data.long
						this.covers[0].longitude = res.data.long
						this.covers[0].callout.content = res.data.name
						console.log(this.covers)
						this.proInfo = res.data;

						uni.hideLoading()
						console.log('--', this.proInfo)
						console.log(this.proInfo)
						if (res.data.favorite === 1) {
							this.isShou = true;
							this.shouIconUrl = '../../static/img/project-img/xin_s.png'
						} else {
							this.shouIconUrl = '../../static/img/project-img/xin.png'
							this.isShou = false;

						}
					} else {
						this.isHas = false;
						uni.hideLoading()
						uni.showToast({
							title: res.msg,
							icon: "none",
							position: 'bottom'
						})
						setTimeout(res => {
							uni.navigateBack()
						}, 1500)


					}
				})
				this.initShare();
				this.initArea();
			},
			initShare() {
				let loginBool = local.localStorage.get('phoneInfo');
				// let token = local.localStorage.get('token');
				if (!loginBool && typeof(loginBool) != "undefined" && loginBool != 0) {
					this.isLogin = false;
				} else {
					this.isLogin = true;
				}
			},
			initArea() {
				api.getFormatArea({
					project_id: this.project_id
				}).then(res => {
					console.log(res);
					if (res.code === 0) {
						if (res.data.length <= 1) {
							this.showArea = false;
						} else {
							this.showArea = true;
						}
						this.arrayArea = res.data;
						this.initAreaImg(this.arrayArea[0].id);
					}
				})
			},
			initAreaImg(format_area_id) {
				api.getFormat({
					format_area_id: format_area_id
				}).then(res => {
					console.log(res);
					if (res.code === 0) {
						if (res.data.length <= 3) {
							console.log(66666)
							this.noMore = true;
							console.log(this.noMore)
							this.areaImg = res.data;
						} else {
							console.log(this.noMore)
							this.noMore = false;
							this.areaImg = res.data;
						}

					}
				})
			},
			showDiagram(item) {
				wx.previewImage({
					current: item.img, // 当前显示图片的http链接
					urls: [item.img] // 需要预览的图片http链接列表
				});
				// uni.navigateTo({
				// 	url: '../diagram/diagram?imgInfo=' + encodeURIComponent(JSON.stringify(item))
				// })
			},
			changeView() {
				this.isShow = !this.isShow;
				this.isShow ? this.lookDesc = '展开' : this.lookDesc = '收起'
				console.log(this.isShow)
			},
			shouGo() {
				// if(this.isShou){
				let loginBool = local.localStorage.get('phoneInfo');
				if (!(loginBool == undefined || loginBool == null)) {
					api.addFavorites({
						project_id: this.project_id
					}).then(res => {
						console.log(res);
						if (res.code === 0) {
							this.isShou = !this.isShou;
							if (this.isShou) {
								this.shouIconUrl = '../../static/img/project-img/xin_s.png'
							} else {
								this.shouIconUrl = '../../static/img/project-img/xin.png'
							}
							uni.showToast({
								title: res.msg,
								icon: "none",
								position: 'bottom'
							})
						}
					})
				} else {
					uni.showToast({
						title: "您还未登录!",
						icon: "none",
						position: 'bottom'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/authorize'
						})
					}, 1500)
				}
			},
			bindPickerChange(e) {
				this.index = e.detail.value;
				this.id = this.arrayArea[e.detail.value].id;
				this.initAreaImg(this.id)

			},
			swierChangeBg(e) {
				this.currentIndexBg = e.detail.current
			},
			swierChange(e) {
				this.currentIndex = e.detail.current
			},
			goIn() {
				let loginBool = local.localStorage.get('phoneInfo');

				if (!(loginBool == undefined || loginBool == null)) {
					uni.navigateTo({
						url: "../application/application?project_id=" + this.project_id
					})
				} else {
					uni.showToast({
						title: "您还未登录!",
						icon: "none",
						position: 'bottom'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '../login/authorize'
						})
					}, 1500)
				}

			},
			connectUs() {
				uni.makePhoneCall({

					// 手机号
					phoneNumber: this.proInfo.phone,

					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: none;
		font-size: 22rpx;
		background: none;
	}

	.page {
		width: 100%;
		min-height: 100%;
		// height: 100%;
		padding-bottom: 100rpx;
		background-color: #f0f2f5;

		.tichText {
			text-indent: 46rpx;
		}

		.common {
			.pro-title {
				font-size: 30rpx;
				color: #333333;
				font-weight: 500;
				margin-bottom: 14rpx;
			}
		}

		.project-bg {
			width: 100%;
			border-radius: 0 75rpx 75rpx 0;
			max-height: 680rpx;
			height: 480rpx;
			position: relative;

			// height: 680rpx;
			// height: 400rpx;
			.swiper-empty-top {
				// position: absolute;
				height: 100%;
				width: 100%;
			}
		}

		.slide-bg {
			position: absolute;
			height: 100%;
			width: 100%;

			// width: 100%;
			// max-height: 680rpx;
			// height: 680rpx;
		}

		.top-desc {
			padding: 20rpx 40rpx;
			color: #999999;
			font-size: 22rpx;
			background-color: #fff;
			.gps-desc{
				width: 80%;
				// font-family: PingFangSC-Medium, PingFang SC;
				font-size: 26rpx;
				color: #666666;
				padding: 0 0 11rpx;
			}
			.top-box {
				margin-bottom: 9rpx;
				display: flex;
				justify-content: space-between;

				.top-left {
					display: flex;

					.pro-name {
						font-size: 30rpx;
						color: #333333;
						margin-right: 26rpx;
						font-weight: 500;
					}

					.status {
						font-size: 22rpx;
						font-weight: 400;
						color: #FFFFFF;
						padding: 0 8rpx;
						height: 39rpx;
						line-height: 39rpx;
						border-radius: 8rpx;
						&.open {
							background-color: #0191D7;
						}

						&.ready {
							background-color: #00C26C;
						}

						&.close {
							background-color: #CCCCCC;
						}
					}
				}

				.top-right {
					display: flex;
					align-items: center;

					.share {
						padding: 0;
						border: none;
						border-color: #fff;
						background-color: transparent;
						outline: none;
						font-size: 22rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.share-desc {
							padding-top: 5rpx;
							line-height: initial;
							color: #999;
							display: contents;
						}
					}

					.share-icon {
						width: 20rpx;
						margin-right: 6rpx;
					}

					.share-desc {}
				}
			}

			.pro-arg {
				.pro-addre {
					display: flex;
					margin-bottom: 6rpx;
					justify-content: space-between;
					align-items: top;

					.flex-box {
						display: flex;
						justify-content: left;

						.flex-desc {
							// width: 147rpx;
							white-space: nowrap
						}

						.add-desc {
							width: 90%;
						}
					}

					.addre-icon {
						margin-left: 6rpx;
						width: 20rpx;
						margin-top: 5rpx;
						padding: 0 0 0 60rpx;
					}
				}

				.pro-arg-two {

					display: flex;
					justify-content: space-between;
				}
			}
		}

		.project-info {
			margin: 20rpx 0 20rpx;
			padding: 20rpx 40rpx;
			color: #999999;
			font-size: 22rpx;
			background-color: #fff;

			.pro-title {
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 14rpx;
			}

			.info-desc {
				margin-bottom: 16rpx;
			}

			.pro-map {
				width: 100%;

				.map {
					width: 100%
				}
			}
		}

		.info-item {
			padding: 20rpx 40rpx;
			background-color: #fff;
			margin-bottom: 20rpx;

			.info-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 14rpx;

				.pro-title {}

				.info-right {
					display: flex;
					align-items: center;
					font-size: 22rpx;
					font-weight: 400;
					color: #333333;

					.sele-icon {
						width: 14rpx;
						margin-left: 8rpx;
					}
				}
			}

			.swiper-box {
				height: 170rpx;

				.swiper-name {
					font-size: 22rpx;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					width: 90%;
					background-color: #54C2F0;
					padding: 8rpx 0;
				}

				.noMore {
					height: 170rpx;
					display: flex;

					.noMore-box {
						width: 200rpx;
						margin-right: 24rpx;

						.swiper-name {
							width: 100%;
						}
					}
				}

				.swiper-empty {
					height: 170rpx;
				}
			}

			.brand {
				display: flex;
				justify-content: end;
				flex-wrap: wrap;

				.brand-item {
					width: 128rpx;
					height: 128rpx;
					padding: 10rpx;
					margin-right: 17rpx;
					margin-bottom: 17rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.brand-bg {
					max-width: 128rpx;
					max-height: 128rpx;
				}
			}
		}

		.slide-image {
			width: 200rpx;
			height: 110rpx;
			border-radius: 15rpx 15rpx 0 0;
			display: block;
		}

		.footer {
			box-sizing: border-box;
			padding: 16rpx 38rpx;
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 100000;
			box-shadow: 0px 1px 8px 0px rgba(1, 145, 215, 0.3);

			.foo-left {
				display: flex;
				justify-content: space-between;
				width: 26%;
				font-size: 22rpx;
				font-weight: 400;
				color: #333333;

				.left-item {
					width: 38%;
				}

				.right-item {
					width: 38%;

					.share {
						// display: block;
						padding: 0;
						border: none;
						border-color: #fff;
						background-color: transparent;
						outline: none;
						font-size: 22rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						.share-desc {
							padding-top: 5rpx;
							line-height: initial;

						}
					}
				}

				.footer-icon {
					width: 44rpx;
					height: 46;
				}
			}

			.foo-right {
				display: flex;
				justify-content: space-between;

				.btn-com {
					width: 200rpx;
					height: 80rpx;
					text-align: center;
					line-height: 80rpx;
					color: #fff;

					&.quick {
						background-color: #0191D7;
						border-radius: 75rpx 0 0 75rpx;
					}

					&.go-in {
						background: #F5B916;
						border-radius: 0 75rpx 75rpx 0;
					}
				}
			}
		}
	}
</style>
