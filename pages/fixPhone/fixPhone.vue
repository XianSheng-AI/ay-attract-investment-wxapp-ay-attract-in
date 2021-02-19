<template>
	<view class="page">
		<view class="content">
			<view class="info_box">
				<van-cell title="修改手机号码" />
				<view class="msg-list">
					<view class="input">
						<van-field input-align="left" :value="phoneNum" @input="phoneNum=$event.detail" placeholder="请输入11位手机号码" />
					</view>
				</view>

				<view class="msg-list">
					<view class="input">
						<van-cell-group>
							<van-field  center clearable :value="code" @input="code=$event.detail" placeholder="请输入短信验证码" :border="false" use-button-slot>
								<van-button slot="button" size="small" type="info" disabled v-show="isGet">{{num}}s后再获取</van-button>
								<van-button slot="button" size="small" type="info" @click="getCode" v-show="!isGet">发送验证码</van-button>
							</van-field>
						</van-cell-group>
					</view>
				</view>
				<view class="msg-list">
					<view class="input subBtn" @click="subCart">
						<van-button type="info" block>保存</van-button>
					</view>
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
				sms: '',
				num: '60',
				isGet:false,
				phoneNum:''
			}
		},
		onLoad() {
			wx.showShareMenu({
				withShareTicket:true,
				menus:["shareAppMessage","shareTimeline"]
			})
		},
		methods: {
			valiPhone() {
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNum))) {
					uni.showToast({
						title: '请填写正确手机号',
						icon: "none",
						position: 'bottom'
					});
					return false;
				} else {
					return true;
				}
			},
			subCart(){
				let params={
					phone:this.phoneNum,
					code:this.code
				}
				if(!this.code){
					uni.showToast({
						title: '请填写验证码',
						icon: "none",
						position: 'bottom'
					});
					return;
				}
				api.updataPhone(params).then((res=>{
					console.log(res)
					if(res.code==0){
						uni.showToast({
							title: '手机号修改成功!',
							icon: "none",
							position: 'bottom'
						});
						let phoneInfo=JSON.parse(local.localStorage.get('phoneInfo'));
						phoneInfo.phone=params.phone;
						local.localStorage.set('phoneInfo',JSON.stringify(phoneInfo));
						setTimeout(()=>{
							uni.navigateBack()
						},1800)
					}else if(res.code==1){
						uni.showToast({
							title: res.msg,
							icon: "none",
							position: 'bottom'
						});
					}
				}))
			},
			getCode() {
				console.log(this.phoneNum)
				console.log('---')
				let bool = this.valiPhone();
				if (!bool) {
					return;
				}
				
				api.sendMsg({phone:this.phoneNum}).then(res=>{
					console.log(res)
					if(res.code===0){
						uni.showToast({
							title: '验证码发送成功',
							icon: "none",
							position: 'bottom'
						});
						
					}else{
						uni.showToast({
							title: '验证码发送失败',
							icon: "none",
							position: 'bottom'
						});
					}
				})
				
				this.isGet = true;
				let time = setInterval(() => {
					if (this.num == 0) {
						this.num = 60;
						clearInterval(time)
						this.isGet = false;
						return;
					}
					this.num--;
				}, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		display: inline-block;
		width: 100%;
		height: 100%;
		background-color: #f0f2f5;
		box-sizing: border-box;
		padding-bottom: 100rpx;

		.content {
			margin: 40rpx auto;
			width: 90%;

			.info_box {
				box-sizing: border-box;
				padding: 10rpx 10rpx 5rpx;
				margin-bottom: 30rpx;
				background-color: #fff;
				border-radius: 8rpx;

				.msg-list {
					display: flex;
					justify-content: start;
					align-items: center;
					width: 100%;
					position: relative;

					.input {
						width: 100%;
						&.subBtn{
							width: 91%;
							margin: 30rpx auto;
						}
					}
				}
			}
		}


	}
</style>
