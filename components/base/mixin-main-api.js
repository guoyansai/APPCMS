export default {
	methods: {
		async saiGetData(vLi, ixSn) {
			let vVal = this.saiLocalRead(this.saiLocalName(vLi, ixSn, ''));
			if (vVal && vVal.ver) {
				if (this.$config.auto.newVerLoad) {
					console.log(666.777888, vLi, this.liToUrl(vLi, 1))
					// auto fresh data from api
					await this.apiVer(vLi, this.liToUrl(vLi, 1)).then((res) => {
						console.log(666.33445566, res);
						if (res.ver > vVal.ver) {
							vVal = {}
						}
					}).finally(() => {
						console.log(666.345);
					});
					console.log(666.345, vVal);
				}
				return vVal;
			}
			return {};
		},
		initApi(vLi = '', listItem = {}) {
			if (vLi && listItem && listItem.li) {
				let showItem = listItem.li.dt[vLi];
				let vUr = this.saiGetVal(listItem, showItem, 'ur');

				// 下划线_开头的全部读取APP包里面的本地数据
				if (vUr === '_') {
					vUr = vUr + vLi;
					this.appDataRead(vLi, vUr);
				} else if (vUr.startsWith('_')) {
					this.appDataRead(vLi, vUr);
				} else if (vUr.startsWith('http')) {
					// 网址链接开头不处理
				} else {
					this.apiInit(vLi);
				}
			} else {
				this.apiInit(vLi);
			}
		},
		appDataFile(vFile) {
			return require('../../' + vFile.replace('.json', '').replace('../../', '') + '.json');
		},
		appDataRequire(vLi, vFile) {
			if (vLi) {
				this.listCur = this.appDataFile(vFile);
				this.initList(vLi, this.listCur);
			} else {
				this.indexCur = this.appDataFile(vFile);
				this.initIndex(this.indexCur);
			}
		},
		appDataRead(vLi, vUr) {
			if (vLi) {
				this.appDataRequire(vLi, '../../data/co/' + vUr + '/co.json');
			} else {
				this.appDataRequire(vLi, '../../data/' + vUr + '/li.json');
			}
		},
		liToFile(vLi, vType = 0) {
			let vFile = '/' + this.indexSn;
			if (vLi) {
				vFile += '/' + vLi;
				if (vType) {
					vFile += '/ver.json';
				} else {
					vFile += '/co.json';
				}
			} else {
				if (vType) {
					vFile += '/ver.json';
				} else {
					vFile += '/li.json';
				}
			}
			return vFile;
		},
		liToUrl(vLi, vType = 0) {
			return this.$config['baseURL' + this.$config.dev] + this.liToFile(vLi, vType) + '?' + Date.now();
		},
		initVal(vLi, vVal) {
			if (vVal && vVal.ver) {
				this.saiLocalAuto(vVal, vLi, this.indexSn);
				if (vLi) {
					this.listCur = vVal;
					this.initList(vLi, this.listCur);
				} else {
					this.indexCur = vVal;
					this.initIndex(this.indexCur);
				}
			}
		},
		apiInit(vLi) {
			if (this.$config['baseURL' + this.$config.dev].startsWith("/data")) {
				this.appDataRequire(vLi, '../..' + this.$config.baseURL + this.liToFile(vLi))
			} else {
				let vUrl = this.liToUrl(vLi);
				if (this.$config.apiType === 'down') {
					this.apiDown(vLi, vUrl);
				} else {
					this.apiHttp(vLi, vUrl);
				}
			}
		},
		apiDown(vLi, vUrl) {
			this.loadShow({
				title: '加载数据...'
			});
			uni.downloadFile({
				url: vUrl,
				timeout: this.$config.time.api,
				success: (res) => {
					if (res.statusCode === 200) {
						this.apiHttp(vLi, res.tempFilePath);
					}
				},
				complete: () => {
					this.loadClose();
				}
			});
		},
		apiHttp(vLi, vUrl) {
			this.loadShow({
				title: '正在缓存...'
			});
			this.saiApi(vUrl).then((res) => {
				let vVal = res.data;
				if (vVal && typeof vVal === 'string') {
					vVal = JSON.parse(vVal);
				}
				this.initVal(vLi, vVal);
			}).finally(() => {
				this.loadClose();
			});
		},
		apiVer(vLi, vUrl) {
			this.loadShow({
				title: '正在同步服务...'
			});
			return new Promise((resolve, reject) => {
				this.saiApi(vUrl).then((res) => {
					let vVal = res.data;
					if (vVal && typeof vVal === 'string') {
						resolve(JSON.parse(vVal));
					}
					resolve(vVal);
				}).finally(() => {
					this.loadClose();
				});
			});
		},
	},
};
