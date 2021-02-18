export default {
	computed: {
		asaiLocalArr() {
			return this.saiLocalRead(this.$config.name.app.local) || []
		},
		asaiLocal() {
			return key => {
				console.log(666.777, this.asaiLocalArr)
				return this.asaiLocalArr.includes(key);
			};
		}
	},
	methods: {
		saiRead(vLi) {
			let vVal = this.saiLocalRead(vLi);
			console.log(666.456, vVal);
			if (vVal) {
				return vVal;
			} else {
				this.saiApi(vLi, 0).then(res => {
					vVal = res[1].data;
					console.log(666.789, vVal)
					if (this.$config.auto.saveLocal) {
						this.saiLocalSave(vVal, vLi);
						this.reLocal(vLi, 0);
						return this.saiLocalRead(vLi);
					}
					return vVal; // 有乱码问题
				});
			}
		},
		reLocal(vLi, vType) {
			if (vLi) {
				let vVal = this.asaiLocalArr;
				if (vType) {
					vVal = vVal.filter(val => val !== vLi);
				} else {
					if (!vVal.length || !vVal.includes(vLi)) {
						vVal.push(vLi);
					}
				}
				this.saiLocalSave(vVal, this.$config.name.app.local);
			}
		},
		saiDel() {
			if (this.asaiLocalArr.length) {
				this.asaiLocalArr.forEach(key => {
					this.saiLocalDel(key);
				});
			}
			this.saiLocalDel(this.$config.name.app.local);
			this.saiLocalDel(this.$config.name.app.web);
			this.dataList = {};
			this.dataIndex = {};
		},
		saiLocalRead(vLi) {
			try {
				let vVal = uni.getStorageSync(this.saiLocalName(vLi))
				if (vVal) {
					return JSON.parse(vVal);
				} else {
					return null;
				}
			} catch (e) {
				console.error(e);
				return null;
			}
		},
		saiLocalDel(vLi) {
			try {
				uni.removeStorageSync(this.saiLocalName(vLi));
			} catch (e) {
				console.error(e);
			}
		},
		saiLocalSave(content, vLi) {
			try {
				uni.setStorageSync(this.saiLocalName(vLi), JSON.stringify(content));
			} catch (e) {
				console.error(e);
			}
		},
		saiLocalName(vLi) {
			let vName = vLi;
			if (!vName) {
				vName = this.$config.name.app.web;
			}
			return this.$config.name.app.startWith + vName + this.$config.name.app.endWith;
		},
		saiApi(vLi, vType) {
			let vUrl = this.$config.baseURL;
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
			console.log(666.234, vUrl)
			return uni.request({
				url: vUrl + '?' + Date.now(),
				method: 'GET'
			});
		},
	},
};
