import request from './request.js'; // 引入封装好的request
// import qs from 'qs'

// 微信授权登录
function getToken (data) {
	return request({
		method: "POST", // 请求方式
		url: '/hireshop/token/authorize', // 请求url
		data: data // 参数
	})
}
// 手机号绑定
function bindPhone (data) {
	return request({
		method: "POST", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/user/bindPhone', // 请求url
		data: data // 参数
	})
}
// 获取当前登录用户手机号
function getPhone (data) {
	return request({
		method: "GET", // 请求方式
		header:{'token':uni.getStorageSync('token')?JSON.parse(uni.getStorageSync('token')).value:''},
		url: '/hireshop/user/userPhone', // 请求url
		data: data // 参数
	})
}
// 手机号修改
function updataPhone (data) {
	return request({
		method: "POST", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/user/updataPhone', // 请求url
		data: data // 参数
	})
}
// 发送手机验证码
function sendMsg (data) {
	return request({
		method: "POST", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/user/sendMsg', // 请求url
		data: data // 参数
	})
}

// -----------------------------------------------------------申请入驻
// 申请入驻提交信息
function applySubmit (data) {
	return request({
		method: "POST", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/Settled/applySubmit', // 请求url
		data: data // 参数
	})
}
// 入驻申请页面获取单个项目
function apply (data) {
	return request({
		method: "GET", // 请求方式
		header:{'token': JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/Settled/apply', // 请求url
		data: data // 参数
	})
}
// 获取所有项目下拉列表
function getProject (data) {
	return request({
		method: "GET", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/Settled/getProject', // 请求url
		data: data // 参数
	})
}

// -------------------------------------------------------------项目列表和详情

// 获取业态分布图
function getFormat (data) {
	return request({
		method: "GET", // 请求方式
		url: '/hireshop/Project/getFormat', // 请求url
		data: data // 参数
	})
}
// 获取业态区列表
function getFormatArea (data) {
	return request({
		method: "GET", // 请求方式
		url: '/hireshop/Project/getFormatArea', // 请求url
		data: data // 参数
	})
}
// 项目详情
function projectDetail (data) {
	console.log(uni.getStorageSync('token'))
	return request({
		method: "GET", // 请求方式
		header:{'token':uni.getStorageSync('token')?JSON.parse(uni.getStorageSync('token')).value:''},
		url: '/hireshop/Project/projectDetail', // 请求url
		data: data // 参数
	})
}
// 所有项目列表
function projectList (data) {
	return request({
		method: "GET", // 请求方式
		url: '/hireshop/Project/projectList', // 请求url
		data: data // 参数
	})
}
// 获取面积范围列表
function getArea (data) {
	return request({
		method: "GET", // 请求方式
		url: '/hireshop/Project/getArea', // 请求url
		data: data // 参数
	})
}
// 获取城市列表
function getCity (data) {
	return request({
		method: "GET", // 请求方式
		url: '/hireshop/Project/getCity', // 请求url
		data: data // 参数
	})
}
// 获取大区域列表
function getRegion (data) {
	return request({
		method: "GET", // 请求方式
		url: '/hireshop/Project/getRegion', // 请求url
		data: data // 参数
	})
}

// -------------------------------------------------------------主页


// 推荐项目
function getProjectList (data) {
	return request({
		method: "GET", // 请求方式
		url: '/hireshop/home/getProjectList', // 请求url
		data: data // 参数
	})
}



// -------------------------------------------------------------公共模块
// -------------------------------------------------------------收藏项目
// 收藏和取消收藏
function addFavorites (data) {
	return request({
		method: "GET", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/Favorites/addFavorites', // 请求url
		data: data // 参数
	})
}
// 我的申请
function mySettled (data) {
	return request({
		method: "GET", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/Userinfo/mySettled', // 请求url
		data: data // 参数
	})
}
// 我的收藏
function myFavorites (data) {
	return request({
		method: "GET", // 请求方式
		header:{'token':JSON.parse(uni.getStorageSync('token')).value},
		url: '/hireshop/Userinfo/myFavorites', // 请求url
		data: data // 参数
	})
}






export default{
	getToken,
	bindPhone,
	getPhone,
	updataPhone,
	sendMsg,
	applySubmit,
	apply,
	getProject,
	getFormat,
	getFormatArea,
	projectDetail,
	projectList,
	getArea,
	getCity,
	getRegion,
	getProjectList,
	addFavorites,
	mySettled,
	myFavorites,
}

// // 临停需要开票订单列表
// function temporaryStop (data) {
// 	return request({
// 		method: "GET", // 请求方式
// 		url: '/receipt/parkorder/temporaryOrder', // 请求url
		
// 		data: data // 参数
// 	})
// }
// // 月保需要开票订单列表
// function monthStop (data) {
// 	console.log(uni.getStorageSync('token'))
// 	return request({
// 		method: "GET", // 请求方式
// 		url: '/receipt/parkorder/orderList', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 开票页面的信息
// function getBillInfo (data) {
// 	return request({
// 		method: "POST", // 请求方式
// 		url: '/receipt/invoice/read', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 开票提交
// function createBill (data) {
// 	console.log(qs.stringify(data))
// 	return request({
// 		method: "POST", // 请求方式
// 		url: '/receipt/invoice/create', // 请求url
// 		header:{
// 			'token':uni.getStorageSync('token'),
// 		},
// 		data: qs.stringify(data) // 参数
// 	})
// }
// // 开票历史列表
// function getHistoryBill (data) {
// 	return request({
// 		method: "GET", // 请求方式
// 		url: '/receipt/history/historyList', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 开票历史详情
// function detailHistoryBill (data) {
// 	return request({
// 		method: "POST", // 请求方式
// 		url: '/receipt/history/detail', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 含有订单列表
// function hasBillList (data) {
// 	return request({
// 		method: "POST", // 请求方式
// 		url: '/receipt/history/detailOrder', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 检测token是否过期
// function veriToken (data) {
// 	return request({
// 		method: "GET", // 请求方式
// 		url: '/token/verification', // 请求url
// 		data: data // 参数
// 	})
// }
// // 首页刷新缓存最新停车场
// function upParking (data) {
// 	return request({
// 		method: "GET", // 请求方式
// 		url: '/receipt/invoice/upParking', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 获取用户手机号
// function userPhone (data) {
// 	return request({
// 		method: "GET", // 请求方式
// 		url: '/receipt/invoice/userPhone', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 绑定手机号
// function bindPhone (data) {
// 	return request({
// 		method: "POST", // 请求方式
// 		url: '/receipt/invoice/bindPhone', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 发送验证码
// function sendCode (data) {
// 	return request({
// 		method: "POST", // 请求方式
// 		url: '/receipt/invoice/sendMsg', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 获取当前登录用户车牌
// function getUserCar (data) {
// 	return request({
// 		method: "GET", // 请求方式
// 		url: '/receipt/invoice/userCar', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }
// // 绑定车牌
// function bindUserCar (data) {
// 	return request({
// 		method: "POST", // 请求方式
// 		url: '/receipt/invoice/upUserCar', // 请求url
// 		header:{'token':uni.getStorageSync('token')},
// 		data: data // 参数
// 	})
// }









