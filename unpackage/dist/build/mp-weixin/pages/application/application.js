(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/application/application"],{"0b85":function(t,e,i){"use strict";(function(t){i("34cb");n(i("66fd"));var e=n(i("5b66"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},2907:function(t,e,i){"use strict";i.r(e);var n=i("ae2f"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=o.a},3293:function(t,e,i){},"5b66":function(t,e,i){"use strict";i.r(e);var n=i("f36d"),o=i("2907");for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);i("ac9e");var s,r=i("f0c5"),m=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"30443224",null,!1,n["a"],s);e["default"]=m.exports},ac9e:function(t,e,i){"use strict";var n=i("3293"),o=i.n(n);o.a},ae2f:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("b60c")),o=a(i("ed7b"));function a(t){return t&&t.__esModule?t:{default:t}}var s={data:function(){return{userType:"",userName:"",phone:"",defaultName:"",isDefault:!1,project_id:"",value:"123456",password:"",show:!1,listXm:[{name:"",id:"",project_id:"",area_max:"",area_min:""}],aListXm:{name:"请选择",id:"",area_max:"",area_min:""},isMask:!1,arrayArea:[{name:"个人"},{name:"企业"}],index:0,arrayYe:[{name:"主力店"},{name:"餐饮"},{name:"服装"},{name:"体验"},{name:"精品"}],indexYe:0,arrayOpen:[{name:"自营"},{name:"加盟"},{name:"直营"}],indexOpen:0,arraySex:[{name:"男"},{name:"女"}],indexSex:0,initXmSele:[],arrayXm:[],indexXm:0,form:{mer_type:"",brand_name:"",format:"",model:"",sex:"",name:"",phone:"",intent_project:[{area_max:"",area_min:"",project_id:""}]},aForm:{mer_type:"",brand_name:"",format:"",model:"",sex:"",name:"",phone:"",intent_project:[{area_max:"",area_min:"",project_id:""}]}}},mounted:function(){this.initSelect()},onLoad:function(t){var e=t.project_id;this.project_id=e,this.initXm(e)},methods:{showToastM:function(e){t.showToast({title:e,icon:"none",position:"bottom"})},initXm:function(t){this.form.intent_project[0].project_id=t,this.listXm[0].project_id=t;var e=this;setTimeout((function(){console.log("arrayXm",e.arrayXm),e.arrayXm.forEach((function(i,n){i.id==t&&(e.listXm[0].name=i.name,e.isDefault=!0,e.defaultName=i.name,e.initXmSelect(n,0,null))}))}),800)},valid:function(){var t=this;if(!this.form.mer_type)return this.showToastM("请选择商户类型"),!1;if(!this.form.brand_name)return this.showToastM("请输入品牌名称"),!1;if(!this.form.format)return this.showToastM("请输入所属业态"),!1;if(!this.form.model)return this.showToastM("请选择开店模式"),!1;if(!this.form.sex)return this.showToastM("请选择性别"),!1;if(!this.form.name)return this.showToastM("请输入名字"),!1;if(!this.form.phone)return this.showToastM("请输入手机号"),!1;var e=/^[1][3,4,5,7,8][0-9]{9}$/;if(!e.test(this.form.phone))return this.showToastM("请输入正确格式的手机号"),!1;if(console.log(6666),this.form.intent_project.length>6)return this.showToastM("最多有6个意向项目!"),!1;var i=!0;return this.form.intent_project.forEach((function(e,n){return t.form.intent_project.length>1&&t.form.intent_project.forEach((function(o,a){if(n!=a&&e.project_id==o.project_id)return t.showToastM("不要出现重复意向项目!"),console.log(9999999999),i=!1,!1})),i?(console.log(6666),e.project_id?e.area_max&&e.area_min?(console.log(222),Number(e.area_max)<Number(e.area_min)?(t.showToastM("最大面积要大于或者等于最小面积！"),i=!1,!1):(console.log(8899),i=!0,!0)):(t.showToastM("请填写完整意向面积"),i=!1,!1):(t.showToastM("请选择意向项目"),i=!1,!1)):(i=!1,!1)})),console.log("boo",i),!!i},submit:function(){var e=this,i=this;this.isMask=!0,this.form.mer_type=this.arrayArea[this.index].name.trim(),this.form.brand_name=this.userType.trim(),this.form.format=this.arrayYe[this.indexYe].name.trim(),this.form.model=this.arrayOpen[this.indexOpen].name.trim(),this.form.sex=this.arraySex[this.indexSex].name.trim(),this.form.name=this.userName.trim(),this.form.phone=this.phone.trim(),this.listXm.forEach((function(t){t.area_min.trim(),t.area_max.trim(),delete t.id})),this.form.intent_project=this.listXm,console.log("form",this.form);var o=this.valid();console.log("bool",o),o?(t.showLoading(),n.default.applySubmit(this.form).then((function(n){console.log(n),t.hideLoading(),0==n.code?(t.showToast({title:"提交成功!",icon:"none",position:"bottom"}),setTimeout((function(){t.switchTab({url:"../me/me"}),i.isMask=!1}),2e3)):(t.hideLoading(),t.showToast({title:n.msg,icon:"none",position:"bottom"}),i.isMask=!1,e.form=e.aForm)}))):this.isMask=!1,console.log("mask",this.isMask)},getUserType:function(t){console.log(t),this.userType=t.detail,console.log(this.minArea)},getName:function(t){this.userName=t.detail},getPhone:function(t){this.phone=t.detail},initSelect:function(){var t=this;n.default.getProject().then((function(e){console.log("猴子"),console.log(e),0===e.code&&(t.arrayXm=e.data,t.initXmSele[0]=e.data)}));var e=JSON.parse(o.default.localStorage.get("phoneInfo"));this.phone=e.phone},deleteXm:function(e){"1"!=this.listXm.length?(this.listXm.splice(e,1),console.log(this.listXm)):t.showToast({title:"至少有一个意向项目!",icon:"none",position:"bottom"})},bindPickerChange:function(t){this.index=t.detail.value},pickerYe:function(t){this.indexYe=t.detail.value},pickerOpenType:function(t){this.indexOpen=t.detail.value},pickerSex:function(t){this.indexSex=t.detail.value},initXmSelect:function(t,e,i){var n=this,o=e,a=this.initXmSele[o].filter((function(e){return e.name!=n.initXmSele[o][t].name}));this.initXmSele[++e]=a,console.log(this.initXmSele)},pickerXm:function(t,e,i){this.isDefault=!1,i.name=this.initXmSele[e][t.detail.value].name,i.id=this.initXmSele[e][t.detail.value].id,i.project_id=this.initXmSele[e][t.detail.value].id,this.indexXm=t.detail.value,this.initXmSelect(t.detail.value,e,i)},onCancel:function(){},onConfirm:function(t){console.log(666666);var e=t.detail;e.picker,e.value,e.index},onClose:function(){this.show=!1},onclick:function(){console.log(123456)},addXm:function(){var e={name:"请选择",id:"",area_max:this.listXm[this.listXm.length-1].area_max,area_min:this.listXm[this.listXm.length-1].area_min};this.listXm.length>5?t.showToast({title:"最多有6个意向项目!",icon:"none",position:"bottom"}):(this.listXm.push(e),this.isDefault=!1,console.log())}}};e.default=s}).call(this,i("543d")["default"])},f36d:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement;t._self._c},a=[]}},[["0b85","common/runtime","common/vendor"]]]);