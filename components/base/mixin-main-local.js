export default {
	methods: {
		saiLocalInit(vLi, ixSn) {
			let vVal = this.saiLocalRead(vLi, ixSn, '');
			if (vVal && vVal.ver) {
				return vVal;
			} else {
				return {};
			}
		},
		saiLocalClear(ixSn) {
			let localArr = this.asaiLocalArr(ixSn);
			if (localArr.length) {
				localArr.forEach(key => {
					this.saiLocalDel(key, ixSn, 'list');
				});
			}
			this.saiLocalDel('', ixSn, 'index');
			this.saiLocalDel('', ixSn, 'local');
		},
		asaiLocalArr(ixSn) {
			let vVal = this.saiLocalRead('', ixSn, 'local');
			if (!vVal || vVal.length || !JSON.stringify(vVal).startsWith('[')) {
				vVal = [];
			}
			return vVal;
		},
		saiLocalAuto(vVal, vLi, ixSn) {
			if (vVal && vVal.ver && this.$config.auto.saveLocal) {
				this.saiLocalSave(vVal, vLi, ixSn, '');
				this.saiLocalRefresh(vLi, ixSn, 0);
			}
		},
		saiLocalRefresh(vLi, ixSn, vType) {
			if (vLi) {
				let vVal = this.asaiLocalArr(ixSn);
				if (vType) {
					vVal = vVal.filter(val => val !== vLi);
				} else {
					if (vVal === [] || !vVal.includes(vLi)) {
						vVal.push(vLi);
					}
				}
				this.saiLocalSave(vVal, '', ixSn, 'local');
			}
		},
	},
};
