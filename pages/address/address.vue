<template>
	<view class="content">
		<!-- <view class="top-view"></view> -->
		<SelectCity :hotCitys="hotCitys" v-model="locationValue" :locationValue="locationValue" @on-select="selectValue" />
	</view>
</template>

<script>
	import api from '../../api/api.js'
	import local from '../../common/local.js'
	import QQMap from '../../static/js/qqmap-wx-jssdk.js'
	import SelectCity from './ss-select-city/ss-select-city.vue'
	export default {
		components: {
			SelectCity
		},
		data() {
			return {
				hotCitys: ['广州', '珠海', '梅州', '重庆', '长沙', '扬州'],
				locationValue: '正在定位...',
				// 页面来源
				sourctType: '',
				getParams:{
					page:'1',
					limit:'50',
					long:'',
					lat:''
				}
			}
		},
		onLoad(options) {
			let that = this;
			this.sourctType = options.sourctType
			if (this.sourctType == 'pushvideo' || this.sourctType == 'pushvideo') {
				uni.setNavigationBarTitle({
					title: '城市选择'
				})
			} 
			// that.getLocation()
		},
		mounted() {
			this.init()
			// this.getLocation();
		},
		methods: {
			init(){
				let localtion=JSON.parse(local.localStorage.get('localtion'));
				console.log(localtion)
				this.locationValue='';
				this.locationValue=localtion.city;
				if(localtion){
					localtion.isChange=false
				}
			},
			getLocation: function() {
				console.log(this)
				this.locationValue=''
				let that = this
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						console.log(res);
						console.log('--------');
						// 	that.locationValue = cityTitle
						// 	uni.$emit('upadteLoaction', cityTitle)
						// } else {
							let latitude = res.latitude
							let longitude = res.longitude
							
							let qqmapsdk = new QQMap({
							  key: '5TPBZ-ZFB3R-NCZWD-WMSLS-QPZ6S-VHFVD'
							});
							that.getParams.long=res.longitude;
							that.getParams.lat=res.latitude;
							
							qqmapsdk.reverseGeocoder({
								location:{
									latitude: res.latitude,
									longitude: res.longitude
								},
								success(resd){
									console.log("resd",resd);
									that.location=resd.result.ad_info.city
									that.locationValue=resd.result.ad_info.city
									console.log(that.locationValue)
									
								}
							})
					},
					fail: (err) => {
						console.log(err);
					}
				});
			},
			selectValue(city) {
				let qqmapsdk = new QQMap({
				  key: '5TPBZ-ZFB3R-NCZWD-WMSLS-QPZ6S-VHFVD'
				});
				 qqmapsdk.geocoder({
					address: city,
					success: function (res) {
						console.log(", 结果: ", res)
						if(res.status===0){
							
							let localtion={
								lat:res.result.location.lat,
								long:res.result.location.lng,
								city:city,
								isChange:true
							}
							local.localStorage.set('localtion',JSON.stringify(localtion))
							
							console.log(66666)
							uni.navigateBack()
						}
					},
					fail: function (err) { //获取经纬度失败
					}
				 })
				// qqmapsdk.search({
				// 	keyword: city,
				// 	// address:'city',
				// 	success: function (res) {
				// 		console.log('res',res);
				// 	},
				// 	fail: function (res) {
				// 		console.log(res);
				// 	},
				// 	complete: function (res) {
				// 		console.log(res);
				// 	}
				// });
				
				
				
				// return;
				// console.log(city)
				// this.locationValue = city
				// // 发职位
				// if (this.sourctType == "publish") {
				// 	uni.$emit('publishCity', city)
				// } else if (this.sourctType == 'pushvideo') {
				// 	console.log("发视频选择地点");
				// 	getApp().globalData.pushVideoLocation = city
				// } else { // 更新首页位置
				// 	uni.$emit('updateHomeLocation', city)
				// }
				// uni.showToast({
				// 	title:city,
				// 	icon: 'none'
				// })
			}
		}
	}
</script>

<style>
	.content {
		/* padding-top: 30rpx; */
		background-color: rgba(34, 33, 33, 1);
	}
	
</style>
