export default {
	methods: {
		saiCheckData(vData) {
			return vData && vData.li && vData.li.pg;
		},
		saiSearchKey(vData) {
			return 'sai' + vData.ty + vData.ss;
		},
		saiSearchCheck(vData, vSearch, vKey) {
			let checkOk = false;
			let searchType = vSearch.ds[vSearch.ty].sn;
			if (searchType) {
				checkOk = this.saiSearchCheckOne(vData, vSearch, vKey, searchType);
			} else {
				vSearch.ds.forEach(item => {
					if (!checkOk && item.sn) {
						checkOk = this.saiSearchCheckOne(vData, vSearch, vKey, item.sn);
					}
				});
			}
			return checkOk;
		},
		saiSearchCheckOne(vData, vSearch, vKey, vType) {
			let vIndex = vData.db.dn.findIndex(itemVal => itemVal === vType);
			let vVal = vData.li.dt[vKey][vIndex];
			return vVal.indexOf(vSearch.ss) !== -1;
		},
	},
};
