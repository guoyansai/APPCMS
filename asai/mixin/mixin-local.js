export default {
	methods: {
		saiLocalRead(vLi, ixSn, vType) {
			try {
				let vVal = uni.getStorageSync(this.saiLocalName(vLi, ixSn, vType));
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
		saiLocalSave(vVal, vLi, ixSn, vType) {
			try {
				let vStr = JSON.stringify(vVal);
				uni.setStorageSync(this.saiLocalName(vLi, ixSn, vType), vStr);
			} catch (e) {
				console.error(666.4043, e);
			}
		},
		saiLocalDel(vLi, ixSn, vType) {
			try {
				uni.removeStorageSync(this.saiLocalName(vLi, ixSn, vType));
			} catch (e) {
				console.error(666.4042, e);
			}
		},
		saiLocalName(vLi, ixSn, vType = 'sai') {
			let tTy = vType;
			if (tTy !== 'local') {
				if (vLi && vLi !== 'undefined') {
					tTy = 'list';
				} else {
					tTy = 'index'
				}
			}
			let vName = this.$config.name.app[tTy];
			vName = (ixSn || '') + vName + (vLi || '');
			return this.$config.name.app.startWith + vName + this.$config.name.app.endWith;
		},
	},
};
