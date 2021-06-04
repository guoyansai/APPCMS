export default {
	onShow: function() {
		uni.$on('clear', res => {
			this.clear();
		});
	},
	onUnload: function() {
		uni.$off('clear');
	},
	onNavigationBarButtonTap(e) {
		if (e.type === 'home') {
			this.goTab();
		} else if (e.type === 'menu') {
			this.goUrl('/pages/map/index');
		}
	},
	methods: {
		clear() {
			this.$asaidata.clear();
		},
	}
};
