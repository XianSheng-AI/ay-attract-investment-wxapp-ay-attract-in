<template>
	<view class="page" :style="{height:windowHeight}">
		<view class="uni-common-mt">
			<view>
				<map show-compass="true" :scale="scale" :style="{height:windowHeight}" :latitude="covers[0].latitude" :longitude="covers[0].longitude"  :markers="covers">
				</map>
				<!-- <image src="../../static/img/map/address-icon.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>
<script>
	import api from '../../api/api.js'
	export default {
		data() {
			return {
				windowHeight:'',
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				scale:5,
				points:[  
					{latitude: 39.9085, longitude: 116.39747},{latitude: 39.90, longitude: 116.39}  
				],
				covers: [
				// 	{
				// 	latitude: 39.9085,
				// 	longitude: 116.39747,
				// 	clickable:true,
				// 	iconPath: '../../static/img/map/address-icon.png',
				// 	width:20,
				// 	height:26,
				// 	 callout:{//自定义标记点上方的气泡窗口 点击有效  
				// 	   　　content:'幸福花园店A组',//文本
				// 	   　　color:'#ffffff',//文字颜色
				// 	   　　fontSize:14,//文本大小
				// 	   　　borderRadius:2,//边框圆角
				// 	  　　 bgColor:'#0191D7',//背景颜色
				// 	   　　display:'ALWAYS',//常显
				// 			padding:3,
				// 	   },
				// },
				],
				
			}
		},
		onShow() {
			wx.showShareMenu({
				withShareTicket:true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus:["shareAppMessage","shareTimeline"]
			})
		},
		onLoad(option) {
			const mapInfo = JSON.parse(decodeURIComponent(option.mapInfo));
			let po=[];
			mapInfo.forEach(item=>{
				po.push({latitude: Number(item.latitude) , longitude:Number(item.longitude) })
			})
			this.points=po;
			this.covers=mapInfo;
		},
		mounted() {
			
		
		},
		methods: {
			getSystemInfo() {
				let that=this;
				uni.getSystemInfo().then(res => {
					let [error, data] = res;
					that.windowHeight = `${data.windowHeight}px`;
					console.log(that.windowHeight)
				});
			},
		},
		created() {
			this.getSystemInfo();
		}
	}
</script>
<style>
	.page{
		width: 100%;
		height: 100%;
	}
	map {
		width: 100%;
		height: 100%;
	}
</style>
