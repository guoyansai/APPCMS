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
		saiSearch(vData, e) {
			if (this.saiCheckData(vData)) {
				if (e.ty) {
					this.listSearch.ty = +e.ty;
				} else {
					this.listSearch.ty = 0;
				}
				if (e.ss) {
					this.listSearch.ss = e.ss;
					let curKey = this.saiSearchKey(vData);
					if (!this.listSearch.dr[curKey]) {
						let curLists = [];
						Object.keys(vData.li.dt).forEach(key => {
							if (this.saiSearchCheck(vData, this.listSearch, key)) {
								curLists.push(key);
							}
						});
						this.listSearch.dr = {};
						this.listSearch.dr[curKey] = curLists;
						this.listPage.pa = curLists.length;
					}
				} else {
					this.listSearch.ss = '';
					this.listSearch.dr = {};
					this.listPage.pa = vData.li.pg.pa;
				}
			}
		},
	},
};
