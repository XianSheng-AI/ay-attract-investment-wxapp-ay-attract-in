<template>
	<view class="page">
		<uni-search-bar radius="5" placeholder="查找项目" clearButton="none" cancelButton="none" @confirm="search" />
		<view class="condition">
			<view class="cond-item">
					<view class="cond-desc">
						<picker @change="bindPickerChange" :value="index" :range="arrayArea" range-key="name">
							<view class="uni-input">{{arrayArea[index].name}}</view>
						</picker>
					</view>
				<!-- </text> -->
				<image class="cond-icon" src="../../static/img/project-img/ic_dowm.png" mode="widthFix"></image>
			</view>
			<view class="cond-item">
				<!-- <text class="cond-desc"> -->
					<view class="cond-desc">
						<picker @change="pickerCity" :value="indCity" :range="arrayCity" range-key="name">
							<view class="uni-input">{{arrayCity[indCity].name}}</view>
						</picker>
					</view>
				<!-- </text> -->
				<image class="cond-icon" src="../../static/img/project-img/ic_dowm.png" mode="widthFix"></image>
			</view>
			<view class="cond-item">
				<!-- <text class="cond-desc"> -->
					<view class="cond-desc">
						<picker @change="pickerBig" :value="indBig" :range="arrayBig" range-key="name">
							<view class="uni-input">{{arrayBig[indBig].name}}</view>
						</picker>
					</view>
				<!-- </text> -->
				<image class="cond-icon" src="../../static/img/project-img/ic_dowm.png" mode="widthFix"></image>
			</view>
			<view class="cond-item" @click="mapLook">
				<text class="cond-desc">地图模式</text>
			</view>
		</view>
		<view class="project-list">
			<view class="pro-item" v-for="(item,index) in listData" @click="detailGo(item.id)">
				<image class="pro-bg" :src="item.img" mode="widthFix"></image>
				<view class="pro-box">
					<view class="pro-name">
						{{item.name}}
					</view>
					<view class="pro-desc">
						<text class="address_desc">{{item.address}}</text>	
						<text>{{item.area}}万m²</text>
					</view>
				</view>
			</view>
			<!-- <view class="pro-item">
				<image class="pro-bg" src="../../static/img/project-img/png@2x.png" mode="widthFix"></image>
				<view class="pro-box">
					<view class="pro-name">
						奥园国际中心
					</view>
					<view class="pro-desc">
						南村万博奥园国际中心
						<text>3万m²</text>
					</view>
				</view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import api from '../../api/api.js'
	export default {
		data() {
			return {
				arrayArea: [],
				index: 0,
				// 城市
				arrayCity:[],
				indCity:0,
				// 面积
				arrayBig:[],
				indBig:0,
				listData:[
					
				],
				coversItem:{
					latitude: 0,
					longitude: 0,
					clickable:true,
					iconPath: '../../static/img/map/address-icon.png',
					width:20,
					height:26,
					 callout:{//自定义标记点上方的气泡窗口 点击有效  
					   　　content:'',//文本
					   　　color:'#ffffff',//文字颜色
					   　　fontSize:14,//文本大小
					   　　borderRadius:2,//边框圆角
					  　　 bgColor:'#0191D7',//背景颜色
					   　　display:'ALWAYS',//常显
							padding:3,
					   },
				},
				covers: [],
				
				getParams:{
					page:'1',
					limit:'50',
					keyword:'',
					region:'',
					city_id:'',
					area:'',
				}
			}
		},
		onLoad() {
			wx.showShareMenu({
				withShareTicket:true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus:["shareAppMessage","shareTimeline"]
			})
		},
		onShow() {
			
		},
		mounted() {
			this.initData();
			this.initList();
		},
		methods: {
			mapLook(){
				let mapInfo=[]
				this.listData.forEach(item=>{
					this.coversItem.latitude=item.lat;
					this.coversItem.longitude=item.long;
					this.coversItem.callout.content=item.name;
					mapInfo.push({
					latitude: item.lat,
					longitude: item.long,
					clickable:true,
					iconPath: '../../static/img/map/address-icon.png',
					width:20,
					height:26,
					 callout:{//自定义标记点上方的气泡窗口 点击有效  
					   　　content:item.name,//文本
					   　　color:'#ffffff',//文字颜色
					   　　fontSize:14,//文本大小
					   　　borderRadius:2,//边框圆角
					  　　 bgColor:'#0191D7',//背景颜色
					   　　display:'ALWAYS',//常显
							padding:3,
					   },
				})
					
				})
				
				console.log(mapInfo)
				uni.navigateTo({
					url:'../map/map?mapInfo='+encodeURIComponent(JSON.stringify(mapInfo))
				})
				
			},
			detailGo(id){
				uni.navigateTo({
					url:'../projectDetail/projectDetail?project_id='+id
				})
			},
			search(val){
				console.log(val)
				this.getParams.keyword=val.value;
				this.initList();
			},
			initData(){
				api.getRegion().then(res=>{
					console.log(res);
					if(res.code===0){
						this.arrayArea=res.data
					}
				})
				api.getCity().then(res=>{
					console.log(res);
					if(res.code===0){
						res.data.forEach(item=>{
							item.name=item.city_name
						})
						this.arrayCity=res.data
					}
				})
				api.getArea().then(res=>{
					console.log(res);
					if(res.code===0){
						this.arrayBig=res.data
					}
				})
			},
			initList(){
				console.log(this.getParams)
				api.projectList(this.getParams).then(res=>{
					console.log(res);
					if(res.code===0){
						this.listData=res.data.list;
					}
				})
			},
			initCity(index){
				let that=this;
				that.indCity='0'
				this.getParams.city_id=''
				let region=this.arrayArea[index].region;
				api.getCity({region:region}).then(res=>{
					console.log(res);
					if(res.code===0){
						res.data.forEach(item=>{
							item.name=item.city_name
						})
						that.arrayCity=res.data;
					}
				})
			},
			bindPickerChange(e) {
				this.index = e.detail.value;
				this.getParams.region=this.arrayArea[e.detail.value].region;
				this.initCity(e.detail.value);
				this.initList();
				
			},
			pickerCity(e){
				this.indCity = e.detail.value
				this.getParams.city_id=this.arrayCity[e.detail.value].city_id+'';
				this.initList();
				
			},
			pickerBig(e){
				this.indBig = e.detail.value;
				this.getParams.area=this.arrayBig[e.detail.value].area;
				this.initList();
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		width: 100%;
		// height: 100%;
		min-height: 100%;
		background-color: #f0f2f5;
	}
.condition{
	box-sizing: border-box;
	height: 100rpx;
	display: flex;
	padding: 0 10rpx;
	background-color: #FFFFFF;
	.cond-item{
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.cond-desc{
			font-size: 26rpx;
			color: #666666;
			margin-right: 6rpx;
			text-overflow:ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		.cond-icon{
			width: 16rpx;
			margin-top: 10rpx;
			margin-left: 0rpx;
		}
	}
}
.project-list{
	padding: 40rpx;
	.pro-item{
		width: 100%;
		border-radius: 8rpx;
		overflow: hidden;
		background-color: #fff;
		box-shadow: 0px 1px 8px 0px rgba(1, 145, 215, 0.3);
		margin-bottom: 30rpx;
		.pro-bg{
			width: 100%;
			max-height: 420rpx;
			overflow: hidden;
		}
		.pro-box{
			padding: 20rpx;
			.pro-desc{
				font-size: 22rpx;
				color: #999;
				display: flex;
				justify-content: space-between;
				.address_desc{
					width: 72%;
				}
			}
			.pro-name{
				font-size: 30rpx;
				color: #333;
				margin-bottom: 8rpx;
			}
		}
	}
}
</style>
