export default {
	onShow: function() {
		uni.$on('fetch', res => {
			if (res.type === 'clear') {
				this.clear();
			} else if (res.type === 'pull') {
				this.$asaidata.get(res.val, 1);
			} else {
				this.$asaidata.get(res.val, 1);
			}
		});
	},
	onUnload: function() {
		uni.$off('fetch');
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
