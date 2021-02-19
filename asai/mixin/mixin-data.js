export default {
	methods: {
		saiUser(type) {
			if (!this.checkObj(this.dataUser || type === 1)) {
				let tempData = require('../../data/template/user.json');
				this.dataUser = { ...tempData
				};
				console.log(666.666, this.dataUser)
			}
		},
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
		saiHtml2Txt(vHtml, len) {
			let vTxt = vHtml;
			vTxt = vTxt.replace(/<[^>]+>/g, "");
			vTxt = vTxt.replace(/(^\s+)|(\s+$)/g, "");
			if (len > 0) {
				vTxt = vTxt.substr(0, len);
			}
			return vTxt;
		},
	},
};
