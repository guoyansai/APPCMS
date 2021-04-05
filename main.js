import Vue from 'vue';
import App from './App';

import Config from './asai/config/config.js';
import Global from './asai/global/global.js';
import AsaiMixin from './asai/mixin/mixin.js';

Vue.prototype.$config = Config;
Vue.prototype.$global = Global;
Vue.mixin(AsaiMixin);

Vue.config.productionTip = false;

App.mpType = 'app';
const app = new Vue({
	...App
});
app.$mount();
