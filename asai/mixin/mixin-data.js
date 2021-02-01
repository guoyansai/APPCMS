export default {
	methods: {
		isPage(file) {
			let fileName = file;
			if (!fileName.endsWith('.vue')) {
				fileName = fileName + '.vue';
			}
			return require('../../' + fileName + '').default;
		},
		saiRead(name) {
			let appName = this.saiAppName(name);
			this.dataLi.name = appName;
			return appName;
		},
		saiSave(name, content) {
			let appName = this.saiAppName(name);
		},
		saiAppName(name) {
			return this.$config.name.app.startWith + name + this.$config.name.app.endWith;
		},
		saiFileName(name) {
			return this.$config.name.file.startWith + name + this.$config.name.file.endWith;
		},
		getApi() {
			uni.request({
				url: 'http://780.pub/test.json',
				data: {},
				success: res => {
					this.tempData = res;
					uni.setStorage({
						key: 'testapp',
						data: this.tempData,
						success: function() {
							console.log('success', res);
						}
					});
				},
				fail: err => {
					console.log('err', err);
				},
				complete: result => {
					console.log('complete', result);
				}
			});
		},
		delApp() {
			uni.removeStorage({
				key: 'testapp',
				success: function(res) {
					console.log('success');
				}
			});
		}
	},
};
