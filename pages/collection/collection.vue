<template>
	<view class="page">
		<view class="isShow" v-if="!isShow">
			<image class="shou-icon" src="../../static/img/me/shou.png" mode="widthFix"></image>
			暂无收藏
		</view>
		<view class="project-list" v-if="isShow">
			<view class="pro-item" v-if v-for="(item,index) in listData" @click="lookDetail(item.id)">
				<image class="pro-bg" :src="item.img" mode="widthFix"></image>
				<view class="pro-box">
					<view class="pro-name">
						{{item.name}}
					</view>
					<view class="pro-desc">
						{{item.address}}
						<text>{{item.area}}万m²</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../api/api.js'
	export default {
		data() {
			return {
				listData:[],
				isShow:true
			}
		},
		mounted() {
			this.init();
		},
		onShow() {
			this.init()
		},
		onLoad() {
			wx.showShareMenu({
				withShareTicket:true,
				menus:["shareAppMessage","shareTimeline"]
			})
		},
		methods: {
			lookDetail(id){
				uni.navigateTo({
					url:'../projectDetail/projectDetail?project_id='+id
				})
			},
			init(){
				api.myFavorites().then(res=>{
					if(res.code===0){
						this.listData=res.data;
						if(res.data.length<1){
							this.isShow=false;
						}else{
							this.isShow=true;
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.shou-icon{
		width: 300rpx;
	}
	.isShow{
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		margin-top: 300rpx;
		color: #AAAAAA;
	}
	.page{
		width: 100%;
	}
.condition{
	height: 100rpx;
	display: flex;
	background-color: #FFFFFF;
	.cond-item{
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: center;
		.cond-desc{
			font-size: 30rpx;
			color: #666666;
			margin-right: 8rpx;
		}
		.cond-icon{
			width: 20rpx;
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
