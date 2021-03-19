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
		saiPage(vData, e) {
			if (this.saiCheckData(vData)) {
				if (e.page) {
					this.listPage.pc = e.page;
				} else {
					this.listPage.pc = 1;
				}
				if (e.pagesize) {
					this.listPage.ps = e.pagesize;
				} else {
					this.listPage.ps = vData.li.pg.ps;
				}
				if (!this.listPage.pa && vData.li.pg.pa) {
					this.listPage.pa = vData.li.pg.pa;
				}
			}
		},
		saiGetVal(listItem, showItem, vKey, vType = 0) {
			let vIndex = listItem.db.dn.findIndex(itemVal => itemVal === vKey);
			if (vIndex > -1 && showItem[vIndex]) {
				if (vType === 1) {
					return listItem.db.dc[vIndex] + '：' + showItem[vIndex];
				} else {
					return showItem[vIndex];
				}
			} else {
				return '';
			}
		},
	},
};
