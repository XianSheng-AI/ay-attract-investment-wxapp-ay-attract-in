(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/authorize"],{"00fb":function(e,t,n){},"29f9":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("ed7b")),a=r(n("b31d")),i=r(n("b60c")),c=r(n("08dc"));function r(e){return e&&e.__esModule?e:{default:e}}var u={data:function(){return{userData:{},WX_AUTH_URL:"https://api.weixin.qq.com/sns/jscode2session",jsCode:""}},onShow:function(){},onLoad:function(){},methods:{wxGetUserInfo:function(t){var n=this;if(console.log(t),!t.detail.iv)return e.showToast({title:"您取消了授权,登录失败",icon:"none"}),!1;e.showLoading({title:"授权中..."}),n.userData=t.detail.userInfo,o.default.localStorage.set("userInfo",JSON.stringify(t.detail.userInfo)),n.initPhone()},getPhone:function(){i.default.getPhone().then((function(t){if(console.log(t),0===t.code){var n={phone:t.data,isLogin:!0};e.hideLoading(),o.default.localStorage.set("phoneInfo",JSON.stringify(n)),e.navigateBack()}else e.hideLoading(),e.navigateTo({url:"./login"})}))},bindPhone:function(t){var n={phone:t,isLogin:!0};i.default.bindPhone({phone:t}).then((function(t){0===t.code?(e.showToast({title:"手机号绑定成功!",icon:"none",position:"bottom"}),o.default.localStorage.set("phoneInfo",JSON.stringify(n)),e.navigateBack()):1===t.code&&e.showToast({title:"手机号绑定失败!",icon:"none",position:"bottom"})}))},initPhone:function(){var t=this,n=o.default.localStorage.get("maid");e.login({success:function(e){t.jsCode=e.code;var a={code:t.jsCode,avatarUrl:t.userData.avatarUrl,maid:n,city:t.userData.city,gender:t.userData.gender,nickName:t.userData.nickName,province:t.userData.province};i.default.getToken(a).then((function(e){0===e.code&&(o.default.localStorage.set("token",e.data.token),o.default.localStorage.set("session_key",e.data.session_key),t.getPhone())}))}})},getPhoneNumber:function(t){var n=this,r=(this.WX_AUTH_URL,a.default.AppId,a.default.AppSecret,this.jsCode,o.default.localStorage.get("maid"));console.log("maid",r),e.login({success:function(u){n.jsCode=u.code;var s={code:n.jsCode,avatarUrl:n.userData.avatarUrl,maid:r,city:n.userData.city,gender:n.userData.gender,nickName:n.userData.nickName,province:n.userData.province};i.default.getToken(s).then((function(n){if(0===n.code){o.default.localStorage.set("token",n.data.token);var r=n.data.session_key,u=new c.default(a.default.AppId,r),s=u.decryptData(t.target.encryptedData,t.target.iv),d={phone:s.phoneNumber,isLogin:!0};i.default.bindPhone({phone:d.phone}).then((function(t){0===t.code?e.showToast({title:"手机号绑定成功!",icon:"none",position:"bottom"}):1===t.code&&e.navigateBack(),o.default.localStorage.set("phoneInfo",JSON.stringify(d)),e.navigateBack()}))}}))}})}}};t.default=u}).call(this,n("543d")["default"])},"460e":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"77ec":function(e,t,n){"use strict";var o=n("00fb"),a=n.n(o);a.a},"9c4f":function(e,t,n){"use strict";(function(e){n("34cb");o(n("66fd"));var t=o(n("e193"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b4e5:function(e,t,n){"use strict";n.r(t);var o=n("29f9"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},e193:function(e,t,n){"use strict";n.r(t);var o=n("460e"),a=n("b4e5");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("77ec");var c,r=n("f0c5"),u=Object(r["a"])(a["default"],o["b"],o["c"],!1,null,"1ae718c0",null,!1,o["a"],c);t["default"]=u.exports}},[["9c4f","common/runtime","common/vendor"]]]);