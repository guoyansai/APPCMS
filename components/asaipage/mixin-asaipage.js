import asaipage from './asaipage.vue';
import mixinMainLoad from '../base/mixin-main-load.js';

export default {
	mixins: [mixinMainLoad],
	components: {
		asaipage
	},
	onLoad: function(e) {
		const _this = this;
		this.$nextTick(function() {
			_this.$refs.asaipage.initAsaiPage(e);
		});
	}
}
