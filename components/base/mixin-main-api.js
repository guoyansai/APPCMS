export default {
	methods: {
		initApi(vLi, listItem) {
			if (vLi && listItem && listItem.li) {
				let showItem = listItem.li.dt[vLi];
				let vUr = this.saiGetVal(listItem, showItem, 'ur');
				if (vUr === '_') {
					vUr = vUr + vLi;
					this.apiData(vLi, vUr);
				} else if (vUr.startsWith('_')) {
					this.apiData(vLi, vUr);
				} else if (vUr.startsWith('http')) {

				} else {
					this.apiInit(vLi);
				}
			} else {
				this.apiInit(vLi);
			}
		},
		liToFile(vLi, vType) {
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
		liToUrl(vLi, vType) {
			return this.$config.baseURL + this.liToFile(vLi, vType) + '?' + Date.now();
		},
		apiData(vLi, vUr) {
			if (vLi) {
				this.requireData(vLi, '../../data/co/' + vUr + '/co.json');
			} else {
				this.requireData(vLi, '../../data/' + vUr + '/li.json');
			}
		},
		loadFile(vFile) {
			return require('../../' + vFile.replace('.json','').replace('../../','') + '.json');
		},
		requireData(vLi, vFile) {
			if (vLi) {
				this.listCur = this.loadFile(vFile);
				this.initList(vLi, this.listCur);
			} else {
				this.indexCur = this.loadFile(vFile);
				this.initIndex(this.indexCur);
			}
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
			if (this.$config.baseURL.startsWith("/data")) {
				this.requireData(vLi, '../..' + this.$config.baseURL + this.liToFile(vLi, 0))
			} else {
				let vUrl = this.liToUrl(vLi, 0);
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
			uni.request({
				url: vUrl,
				timeout: this.$config.time.api,
				success: res => {
					let vVal = res.data;
					if (vVal && typeof vVal === 'string') {
						vVal = JSON.parse(vVal);
					}
					this.initVal(vLi, vVal);
				},
				complete: () => {
					this.loadClose();
				},
			});
		},
	},
};
