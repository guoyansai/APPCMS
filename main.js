import Vue from 'vue'
import App from './App'
import Config from './asai/config/config.json'
import Common from './asai/common/common.js'
import AsaiConstMixin from './asai/common/const-mixin.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$config = Config
Vue.prototype.$common = Common

Vue.mixin(AsaiConstMixin)

const app = new Vue({
	...App
})
app.$mount()
