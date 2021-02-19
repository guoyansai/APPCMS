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
			return new Promise((resolve, reject) => {
				if (!vLi && this.dataLi.indexObj.ver) {
					resolve(this.dataLi.indexObj);
				} else if (vLi && this.dataLi.listObj.ver && vLi === this.dataLi.listObj.sn) {
					resolve(this.dataLi.listObj);
				} else {
					let vVal = this.saiLocalRead(vLi);
					if (vVal && vVal.ver) {
						resolve(vVal);
					} else {
						return this.saiApi(vLi, 0);
					}
				}
			});
		},
		saiReadSync(vLi) {
			if (!vLi && this.dataLi.indexObj.ver) {
				return this.dataLi.indexObj;
			} else if (vLi && this.dataLi.listObj.ver && vLi === this.dataLi.listObj.sn) {
				return this.dataLi.listObj;
			} else {
				let vVal = this.saiLocalRead(vLi);
				if (vVal && vVal.ver) {
					return vVal;
				} else {
					return null;
				}
			}
		},
		saiAutoLocal(vVal, vLi) {
			if (vVal && vVal.ver && this.$config.auto.saveLocal) {
				this.saiLocalSave(vVal, vLi);
				this.saiReLocal(vLi, 0);
			}
		},
		saiReLocal(vLi, vType) {
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
			this.dataLi.listObj = {};
			this.dataLi.indexObj = {};
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
				console.error(666.4041, e);
				return null;
			}
		},
		saiLocalDel(vLi) {
			try {
				uni.removeStorageSync(this.saiLocalName(vLi));
			} catch (e) {
				console.error(666.4042, e);
			}
		},
		saiLocalSave(vVal, vLi) {
			try {
				let vStr = JSON.stringify(vVal);
				uni.setStorageSync(this.saiLocalName(vLi), vStr);
			} catch (e) {
				console.error(666.4043, e);
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
			return new Promise((resolve, reject) => {
				uni.request({
					url: vUrl + '?' + Date.now(),
					success: (res) => {
						console.log(666.10001, vUrl, res);
						let vVal = res.data;
						if (vVal && vVal.ver) {
							this.saiAutoLocal(vVal, vLi);
							resolve(vVal);
						} else {
							reject('err')
						}
					},
					fail: (err) => {
						reject(err)
					}
				});
			});
		},
	},
};
