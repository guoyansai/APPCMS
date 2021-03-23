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
		liToUrl(vLi, vType) {
			let vUrl = this.$config.baseURL + '/' + this.indexSn;
			if (vLi) {
				vUrl += '/' + vLi;
				if (vType) {
					vUrl += '/ver.json';
				} else {
					vUrl += '/co.json';
				}
			} else {
				if (vType) {
					vUrl += '/ver.json';
				} else {
					vUrl += '/li.json';
				}
			}
			return vUrl + '?' + Date.now();
		},
		apiData(vLi, vUr) {
			if (vLi) {
				this.listObj = require('../../data/co/' + vUr + '/co.json');
				this.initList(this.listObj, vLi);
			} else {
				this.indexObj = require('../../data/' + vUr + '/li.json');
				this.initIndex(this.indexObj);
			}
		},
		apiInit(vLi) {
			let vUrl = this.liToUrl(vLi, 0);
			if (this.$config.apiType === 'down') {
				this.apiDown(vLi, vUrl);
			} else {
				this.apiHttp(vLi, vUrl);
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
					if (vVal && vVal.ver) {
						this.saiLocalAuto(vVal, vLi, this.indexSn);
						if (vLi) {
							this.listObj = vVal;
							this.initList(this.listObj, vLi);
						} else {
							this.indexObj = vVal;
							this.initIndex(this.indexObj);
						}
					}
				},
				complete: () => {
					this.loadClose();
				},
			});
		},
	},
};
