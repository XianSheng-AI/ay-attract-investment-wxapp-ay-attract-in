import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
import './wxiview/index/index'
import './wxiview/index-item/index'

const app = new Vue({
	...App
})
app.$mount()

export default {
  config: {
    usingComponents: {
      "i-index": "/wxiview/index/index",
      "i-index-item": "/wxiview/index-item/index"
    }
  }
}