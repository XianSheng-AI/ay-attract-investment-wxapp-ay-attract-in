<template>
	<view class="page">
		<view class="scaleImg">
		      <image class="diagram-img" :src="imgData.img" mode="widthFix" @click="showBig"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgData:{},
			}
		},
		onShow() {
			// this.init()
		},
		onLoad(option) {
			
			wx.showShareMenu({
				withShareTicket:true,
				menus:["shareAppMessage","shareTimeline"]
			})
			const imgInfo = JSON.parse(decodeURIComponent(option.imgInfo));
			this.imgData=imgInfo;
			this.init()
			uni.showToast({
				title: "点击可放大观看",
				icon: "none",
				position: 'bottom'
			})
		},
		methods: {
			init(){
				setTimeout(()=>{
					wx.previewImage({
					    current: this.imgData.img, // 当前显示图片的http链接
					    urls: [this.imgData.img] // 需要预览的图片http链接列表
					});
				},50)
			},
			showBig(){
				wx.previewImage({
				    current: this.imgData.img, // 当前显示图片的http链接
				    urls: [this.imgData.img] ,// 需要预览的图片http链接列表
					complete:function(){
							return;
					    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.page{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.diagram-img{
		height: 400rpx;
}
.scaleImg {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	padding: 150rpx;
	box-sizing: border-box;
}

</style>
