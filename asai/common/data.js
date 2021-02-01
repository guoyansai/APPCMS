import Config from '../config/config.json'

export default {
	saiRead(name) {
		let appName = this.saiAppName(name);
		this.dataLi = {
			name: appName
		}
		return appName;
	},
	saiSave(name, content) {
		let appName = this.saiAppName(name);
	},
	saiAppName(name) {
		return Config.name.app.startWith + name + Config.name.app.endWith;
	},
	saiFileName(name) {
		return Config.name.file.startWith + name + Config.name.file.endWith;
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
}
