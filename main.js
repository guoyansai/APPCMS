import Vue from 'vue';
import App from './App';

import AsaiConfig from './asai/config/config.js';
import AsaiGlobal from './asai/global/global.js';
import AsaiMixin from './asai/mixin/mixin.js';

Vue.prototype.$config = AsaiConfig;
Vue.prototype.$global = AsaiGlobal;
Vue.mixin(AsaiMixin);

Vue.config.productionTip = false;

App.mpType = 'app';
const app = new Vue({
	...App
});
app.$mount();
