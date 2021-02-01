import Vue from 'vue'
import App from './App'
import Config from './asai/config/config.json'
import Common from './asai/common/common.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$config = Config
Vue.prototype.$common = Common
Vue.prototype.myVal = Common

const app = new Vue({
	...App
})
app.$mount()
