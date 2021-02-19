<template>
	<view class="page">
		<view class="content">
			<view class="info_box">
				<!-- <van-cell title="展示弹出层" is-link @click="showPopup" /> -->
				<van-cell title="基本信息" />
				<view class="msg-list" @click="">
					<text class="dot">*</text>
					<view class="input">
						<picker @change="bindPickerChange" :value="index" :range="arrayArea" range-key="name">
							<view class="uni-input">{{arrayArea[index].name}}</view>
						</picker>
						<van-cell title="商户类型" is-link />
					</view>
				</view>
				<view class="msg-list">
					<text class="dot">*</text>
					<view class="input">
						<van-field input-align="right" @input="getUserType" name="picker" :value="userType" label="品牌名称" placeholder="请输入" />
					</view>
				</view>

				<view class="msg-list">
					<text class="dot">*</text>
					<view class="input">
						<picker @change="pickerYe" :value="indexYe" :range="arrayYe" range-key="name">
							<view class="uni-input">{{arrayYe[indexYe].name}}</view>
						</picker>
						<van-cell title="所属业态" is-link />
					</view>
				</view>

				<view class="msg-list">
					<text class="dot">*</text>
					<view class="input">
						<picker @change="pickerOpenType" :value="indexOpen" :range="arrayOpen" range-key="name">
							<view class="uni-input">{{arrayOpen[indexOpen].name}}</view>
						</picker>
						<van-cell title="开店模式" is-link />
					</view>
				</view>
				<view class="zhe-line"></view>
				<van-popup :show="show" @close="onClose" position="bottom" custom-style="height: 40%">
					<van-picker show-toolbar data-popup="showProvince" custom-style="height: 30%" @cancel="onCancel" @confirm="onConfirm"
					 :columns="columns" @change="onChange" />
				</van-popup>
			</view>
			<view class="info_box">
				<!-- <van-cell title="展示弹出层" is-link @click="showPopup" /> -->
				<van-cell title="联系人信息" />
				<view class="msg-list">
					<text class="dot">*</text>
					<view class="input">
						<picker @change="pickerSex" :value="indexSex" :range="arraySex" range-key="name">
							<view class="uni-input">{{arraySex[indexSex].name}}</view>
						</picker>
						<van-cell title="性别" is-link />
					</view>
				</view>
				<view class="msg-list">
					<text class="dot">*</text>
					<view class="input">
						<van-field input-align="right"  @input="getName" name="picker" :value="userName" label="姓名" placeholder="请输入" />
					</view>
				</view>

				<view class="msg-list">
					<text class="dot">*</text>
					<view class="input">
						<van-field input-align="right"  @input="getPhone" name="picker" :value="phone" label="手机号" placeholder="请输入" />
					</view>
				</view>
				<view class="zhe-line"></view>
			</view>
			<view class="info_box">
				<van-cell title="意向信息" />
				<view class="itemXm" v-for="(item,index) in listXm" :key="index">
					<view class="msg-list">
						<text class="dot">*</text>
						<view class="input">
							<picker @change="pickerXm($event,index,item)"   :value="indexXm" :range="initXmSele[index]" range-key="name">
								<view class="uni-input">{{isDefault?defaultName:item.name}}</view>
							</picker>
							<van-cell title="意向项目" is-link />
						</view>
					</view>
					<view class="msg-list">
						<text class="dot">*</text>
						<view class="input yi">
							<text class="area-lable">意向面积</text>
							<input v-model="item.area_min" class="com-area min-area" type="text" placeholder-style="font-size: 24rpx;color:#999" placeholder="最小面积m²" />
							<view class="line">-</view>
							<input v-model="item.area_max" class="com-area max-area" type="text" placeholder-style="font-size: 24rpx;color:#999" placeholder="最大面积m²" />
						</view>
					</view>
					<view class="msg-list delete">
						<view class="dele-btn" @click="deleteXm(index)">删除</view>
					</view>
				</view>
				<view class="msg-list add" @click="addXm">
					<image class="add-icon" src="../../static/img/index/ic_add.png" mode="widthFix"></image>
					<text class="add-desc">添加意向项目</text>
				</view>
			</view>
		</view>
		<view class="subBtn" @click="submit">提交申请</view>
		<view class="mask" v-if="isMask"></view>
	</view>
</template>

<script>
	import api from '../../api/api.js'
	import local from '../../common/local.js'
	export default {
		data() {
			return {
				userType: '',
				userName:'',
				phone:'',
				
				defaultName:'',
				isDefault:false,
				
				project_id:'',
				
				value: '123456',
				password: '',
				show: false,

				listXm: [
					{
					name: '',
					id:'',     //需要去掉
					project_id:'',
					area_max: '',
					area_min: ''
				},
				],
				aListXm: {
					name: '请选择',
					id:'',
					area_max: '',
					area_min: ''
				},
				
				isMask:false,

				arrayArea: [{
					name: '个人'
				}, {
					name: '企业'
				}],
				index: 0,
				// 业态
				arrayYe: [{
					name: '主力店'
				}, {
					name: '餐饮'
				}, {
					name: '服装'
				}, {
					name: '体验'
				}, {
					name: '精品'
				}],
				indexYe: 0,
				// 开店模式
				arrayOpen: [{
					name: '自营'
				}, {
					name: '加盟'
				}, {
					name: '直营'
				}],
				indexOpen: 0,
				// 性别
				arraySex: [{
					name: '男'
				}, {
					name: '女'
				}],
				indexSex: 0,
				// 意向项目
				
				initXmSele:[],
				
				arrayXm: [],
				indexXm: 0,
				form:{
					mer_type:'',
					brand_name:'',
					format:'',
					model:'',
					sex:'',
					name:'',
					phone:'',
					intent_project:[{
						area_max:'',
						area_min:'',
						project_id:'',
					}]
				},
				aForm:{
					mer_type:'',
					brand_name:'',
					format:'',
					model:'',
					sex:'',
					name:'',
					phone:'',
					intent_project:[{
						area_max:'',
						area_min:'',
						project_id:'',
					}]
				}
			}
		},
		mounted() {
			this.initSelect();
		},
		onLoad(option) {
			let _id = option.project_id;
			this.project_id = _id
			this.initXm(_id)
			
		},
			
		methods: {
			showToastM(desc){
				uni.showToast({
					title: desc,
					icon: "none",
					position: 'bottom'
				})
			},
			initXm(project_id){
				this.form.intent_project[0].project_id=project_id;
				this.listXm[0].project_id=project_id;
				let that=this;
				setTimeout(()=>{
					console.log('arrayXm',that.arrayXm);
					that.arrayXm.forEach((item,index)=>{
						if(item.id==project_id){
							that.listXm[0].name=item.name;
							that.isDefault=true;
							that.defaultName=item.name;
							that.initXmSelect(index,0,null)
						}
					})
				},800)
				
			},
			valid(){
				if(!this.form.mer_type){
					this.showToastM('请选择商户类型');
					return false;
				}
				if(!this.form.brand_name){
						this.showToastM('请输入品牌名称');
						return false;
				}
				if(!this.form.format){
					this.showToastM('请输入所属业态');
					return false;
				}
				if(!this.form.model){
					this.showToastM('请选择开店模式');
					return false;
				}
				if(!this.form.sex){
					this.showToastM('请选择性别');
					return false;
				}
				if(!this.form.name){
					this.showToastM('请输入名字');
					return false;
				}
				if(!this.form.phone){
					this.showToastM('请输入手机号');
					return false;
				}
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
					
					if(!myreg.test((this.form.phone))){
						this.showToastM('请输入正确格式的手机号');
						return false;
					}
				console.log(6666)
				if(this.form.intent_project.length>6){
					this.showToastM('最多有6个意向项目!');
					return false;
				}
				let bool=true;
				this.form.intent_project.forEach((item,index)=>{
					if(this.form.intent_project.length>1){
						this.form.intent_project.forEach((ite,ind)=>{
							if(index!=ind){
								if(item.project_id==ite.project_id){
									this.showToastM('不要出现重复意向项目!');
									console.log(9999999999)
										bool=false;
									return false;
								}
							}
						})
					}
					if(!bool){
						bool=false;
						return false;
					}
					
					console.log(6666)
					if(!item.project_id){
						this.showToastM('请选择意向项目');
						bool=false;
						return false;
					}
					if(!item.area_max||!item.area_min){
						this.showToastM('请填写完整意向面积');
						bool=false;
						return false;
					}
					console.log(222)
					if(Number(item.area_max) < Number(item.area_min)){
						this.showToastM('最大面积要大于或者等于最小面积！');
						bool=false;
						return false;
					}
					console.log(8899)
					bool=true;
					return true;
				})
				console.log('boo',bool)
				if(bool){
					return true;
				}else{
					return false;
				}
				
			},
			submit(){
				let that=this;
				this.isMask=true;
				this.form.mer_type=this.arrayArea[this.index].name.trim();
				this.form.brand_name=this.userType.trim();
				this.form.format=this.arrayYe[this.indexYe].name.trim();
				this.form.model=this.arrayOpen[this.indexOpen].name.trim();
				this.form.sex=this.arraySex[this.indexSex].name.trim();
				this.form.name=this.userName.trim();;
				this.form.phone=this.phone.trim();;
				this.listXm.forEach(item=>{
					item.area_min.trim();
					item.area_max.trim();
					delete item.id 
				})
				this.form.intent_project=this.listXm;
				console.log('form',this.form);
				// return;
				let bool=this.valid()
				console.log('bool', bool)
				if(bool){
					uni.showLoading();
					api.applySubmit(this.form).then(res=>{
						console.log(res)
						uni.hideLoading();
						if(res.code==0){
							uni.showToast({
								title: '提交成功!',
								icon: "none",
								position: 'bottom'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'../me/me'
								})
								that.isMask=false;
							},2000)
						}else{
							uni.hideLoading();
							uni.showToast({
								title: res.msg,
								icon: "none",
								position: 'bottom'
							})
							
							that.isMask=false;
							this.form=this.aForm;
						}
					})
				}else{
					this.isMask=false;
				}
				console.log('mask',this.isMask)
			},
			getUserType(e){
				console.log(e)
				this.userType = e.detail;
				console.log(this.minArea)
				
			},
			getName(e){
				this.userName = e.detail
			},
			getPhone(e){
				this.phone = e.detail
			},
			
			
			initSelect() {
				api.getProject().then(res => {
					console.log('猴子')
					console.log(res)
					if (res.code === 0) {
						this.arrayXm = res.data
						this.initXmSele[0]=res.data;
					}
				})
				let phoneObj=JSON.parse(local.localStorage.get('phoneInfo'));
				this.phone=phoneObj.phone;
				
			},
			deleteXm(index){
				if(this.listXm.length=='1'){
					uni.showToast({
						title: "至少有一个意向项目!",
						icon: "none",
						position: 'bottom'
					})
					return;
				}else{
					this.listXm.splice(index,1);
					console.log(this.listXm)
				}
				
			},
			bindPickerChange(e) {
				this.index = e.detail.value;
			},
			pickerYe(e) {
				this.indexYe = e.detail.value;
			},
			pickerOpenType(e) {
				this.indexOpen = e.detail.value;
			},
			pickerSex(e) {
				this.indexSex = e.detail.value;
			},
			initXmSelect(indexd, arg,item){
				let ind=arg;   //列表第几个
				let seleIndex=indexd;   //下拉第几个
				let sele=this.initXmSele[ind].filter(item=>{
					return item.name!=this.initXmSele[ind][indexd].name
				})
				this.initXmSele[++arg]=sele
				console.log(this.initXmSele)
			},
			pickerXm(e, arg,item) {
				this.isDefault=false;
				item.name=this.initXmSele[arg][e.detail.value].name     
				item.id=this.initXmSele[arg][e.detail.value].id
				item.project_id=this.initXmSele[arg][e.detail.value].id
				this.indexXm = e.detail.value;
				this.initXmSelect(e.detail.value,arg,item);
				
			},
			onCancel() {

			},
			onConfirm(event) {
				console.log(666666)
				const {
					picker,
					value,
					index
				} = event.detail;
				// Toast(`当前值：${value}, 当前索引：${index}`);
			},

			onClose() {
				this.show = false
			},
			onclick() {
				console.log(123456)
			},
			addXm() {
				let newObj={
					name: '请选择',
					id:'',
					area_max: this.listXm[this.listXm.length-1].area_max,
					area_min: this.listXm[this.listXm.length-1].area_min
				}
				if(this.listXm.length>5){
					uni.showToast({
						title: "最多有6个意向项目!",
						icon: "none",
						position: 'bottom'
					})
					
				}else{
					this.listXm.push(newObj)
					this.isDefault=false;
					console.log()
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 10000;
		opacity: 0;
	}
	.page {
		display: inline-block;
		width: 100%;
		min-height: 100%;
		// height: 100%;
		background-color: #f0f2f5;
		// overflow: hidden;
		box-sizing: border-box;
		padding-bottom: 100rpx;

		.subBtn {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #FFFFFF;
			background-color: #0191D7;
			position: fixed;
			bottom: 0;
			left: 0;
			font-size: 36rpx;
			z-index: 1000;
		}

		.content {
			margin: 40rpx auto;
			width: 90%;

			// background-color: #fff;
			.info_box {
				box-sizing: border-box;
				padding: 10rpx;
				margin-bottom: 30rpx;
				background-color: #fff;
				border-radius: 8rpx;
				position: relative;
				.zhe-line{
					position: absolute;
					bottom: 0;
					left: 0;
					height: 15rpx;
					width: 100%;
					background-color: #fff;
				}
			}

			.msg-list {
				display: flex;
				justify-content: start;
				align-items: center;
				width: 100%;
				position: relative;

				&.add {
					justify-content: center;
					border-top: 1px solid #f4f4f4;

					// border-bottom: 1px solid #f4f4f4;
					.add-icon {
						width: 30rpx;
						margin-right: 8rpx;
					}

					.add-desc {
						font-size: 36rpx;
						font-weight: 400;
						color: #54C2F0;
						padding: 30rpx 0;
					}
				}

				&.delete {
					height: 82rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					border-top: 1px solid #f4f4f4;
				}

				.uni-input {
					position: absolute;
					right: 0;
					top: 0;
					width: 60%;
					height: 100%;
					text-align: right;
					line-height: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					padding-right: 11.2%;
					color: #ababab;
					font-size: 28rpx;
					z-index: 10000;
				}

				.dele-btn {
					width: 118rpx;
					height: 55rpx;
					line-height: 55rpx;
					color: #54C2F0;
					border-radius: 36px;
					border: 2px solid #54C2F0;
					font-size: 24rpx;
					text-align: center;
					margin-right: 34rpx;
				}

				.dot {
					position: absolute;
					left: 12rpx;
					top: 32%;
					z-index: 100;
					color: red;
				}

				.input {
					width: 100%;

					&.yi {
						padding: 0 30rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 88rpx;

						.place {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;
						}

						.area-lable {
							font-size: 28rpx;
							font-weight: 400;
							color: #333333;
						}

						.com-area {
							font-size: 28rpx;
							font-weight: 400;
							color: #333333;
							width: 23%;
							text-align: center;

							&.min-area {
								margin-left: 140rpx;
							}

							&.max-area {}
						}

						.line {}
					}
				}
			}
		}
	}
</style>
