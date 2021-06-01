export default {
	methods: {
		saiLocalRead(localName) {
			try {
				let vVal = uni.getStorageSync(localName);
				if (vVal) {
					return JSON.parse(vVal);
				} else {
					return null;
				}
			} catch (e) {
				return null;
			}
		},
		saiLocalSave(localName, vVal) {
			try {
				let vStr = JSON.stringify(vVal);
				uni.setStorageSync(localName, vStr);
			} catch (e) {}
		},
		saiLocalDel(localName) {
			try {
				uni.removeStorageSync(localName);
			} catch (e) {}
		},
		saiLocalName(vLi, ixSn, vType = 'sai') {
			let tTy = vType;
			if (tTy !== 'tools') {
				if (vLi && vLi !== 'undefined') {
					tTy = 'list';
				} else {
					tTy = 'index'
				}
			}
			let vName = this.$config.name.app[tTy];
			vName = (ixSn || '') + vName + (vLi || '');
			return this.$config.name.app.startsWith + vName + this.$config.name.app.endsWith;
		},
	},
};
