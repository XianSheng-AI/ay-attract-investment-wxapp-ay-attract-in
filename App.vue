<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.3&key=6ee71f2fd5eece7797fafe8b9f7a090a&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder"></script>
<script>
	
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		uni.showShareMenu()
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	
};
</script>

<style>
	@import url("/wxcomponents/vant/common/index.wxss");
	/* @import url("/wxiview/"); */
	uni-page-body,html,body{  
	        height: 100%;  
	    }  
	.container{
		width: 100%;
		height: 100%;
	}
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
