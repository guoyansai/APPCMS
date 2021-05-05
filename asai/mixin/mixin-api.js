export default {
	methods: {
		saiApi(vUrl, vData = {}, vHead = {}) {
			return new Promise((resolve, reject) => {
				uni.request({
					url: vUrl,
					data: vData,
					header: vHead,
					timeout: this.$config.time.api,
					success: (res) => {
						resolve(res);
					},
					fail: (err) => {
						reject(err);
					},
					complete: () => {
						reject(new Error('sai err'));
					},
				});
			});
		}
	},
};
