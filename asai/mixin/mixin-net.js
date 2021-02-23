export default {
	computed: {
		getType() {
			if (this.netWork) {
				return 'web';
			} else {
				return 'local';
			}
		}
	},
	methods: {
		async getNet() {
			await uni.getNetworkType({
				success: function(res) {
					this.netWork = res.networkType;
				}
			});
		},
		checkNet() {
			uni.onNetworkStatusChange(function(res) {
				if (res.isConnected) {
					this.netWork = res.networkType;
				} else {
					this.netWork = '';
				}
			});
		}
	},
};
