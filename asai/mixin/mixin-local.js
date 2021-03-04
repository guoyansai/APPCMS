export default {
	methods: {
		saiLocalRead(vLi, ixSn) {
			try {
				let vVal = uni.getStorageSync(this.saiLocalName(vLi, ixSn))
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
		saiLocalSave(vVal, vLi, ixSn) {
			try {
				let vStr = JSON.stringify(vVal);
				uni.setStorageSync(this.saiLocalName(vLi, ixSn), vStr);
			} catch (e) {
				console.error(666.4043, e);
			}
		},
		saiLocalDel(vLi, ixSn) {
			try {
				uni.removeStorageSync(vLi, ixSn, this.saiLocalName(vLi, ixSn));
			} catch (e) {
				console.error(666.4042, e);
			}
		},
		saiLocalName(vLi, ixSn) {
			let vName = ixSn;
			if (vLi && vLi !== 'undefined') {
				vName += vLi;
			} else {
				vName = ixSn + this.$config.name.app.local;
			}
			return this.$config.name.app.startWith + vName + this.$config.name.app.endWith;
		},
	},
};
