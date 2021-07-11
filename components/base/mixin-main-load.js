export default {
	onShow: function() {
		uni.$on('clear', res => {
			if (res === 'do') {
				this.clear();
			} else {
				this.$asaidata.get(res, 1);
			}
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
