import base from './base.js'
let App=getApp();
let request = (config) => {
	// 处理 apiUrl
	config.url = base.dev+'/api' + config.url;
	if (!config.data) {
		config.data = {};
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(responses => {
			// 异常
			if (responses[0]) {
				reject({
					message: "网络超时"
				});
			} else {
				let response = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
		
			if(response.code===4){
				uni.showToast({
					title: '登录失效，请重新登录',
					icon: "none",
					position: 'bottom'
				});
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('localtion');
				setTimeout(()=>{
					uni.redirectTo({
						url:'/pages/login/authorize'
					})
				},2000)
			}
				if(response.code===5){
					uni.showToast({
						title: '自动返回重新登录...',
						icon: "none",
						position: 'bottom'
					});
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('localtion');
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/login/authorize'
						})
					},2000)
				}
				if(response.code!==0){
				
					setTimeout(() => {
						uni.hideLoading()
					}, 2000)
				}
				setTimeout(() => {
					//延时关闭  加载中的 loading框
					uni.hideLoading()
				}, 800)
				resolve(response);
			}
		}).catch(error => {
			console.log('++++')
			reject(error);
		})
	})
	return promise;
};

export default request;
