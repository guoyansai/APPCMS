export default {
	methods: {
		saiLocalInit(vLi, ixSn) {
			let vVal = this.saiLocalRead(this.saiLocalName(vLi, ixSn, ''));
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
					this.saiLocalDel(this.saiLocalName(key, ixSn, 'list'));
				});
			}
			this.saiLocalDel(this.saiLocalName('', ixSn, 'index'));
			this.saiLocalDel(this.saiLocalName('', ixSn, 'local'));
		},
		asaiLocalArr(ixSn) {
			let vVal = this.saiLocalRead(this.saiLocalName('', ixSn, 'local'));
			if (!vVal || vVal.length || !JSON.stringify(vVal).startsWith('[')) {
				vVal = [];
			}
			return vVal;
		},
		saiLocalAuto(vVal, vLi, ixSn) {
			if (vVal && vVal.ver && this.$config.auto.saveLocal) {
				this.saiLocalSave(this.saiLocalName(vLi, ixSn, ''), vVal);
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
				this.saiLocalSave(this.saiLocalName('', ixSn, 'local'), vVal);
			}
		},
	},
};
