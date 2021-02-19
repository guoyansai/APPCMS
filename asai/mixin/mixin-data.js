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
		saiInit(vData) {
			this.saiInitPage(vData);
			this.saiInitSearch(vData);
		},
		saiInitPage(vData) {
			if (this.saiCheckData(vData) && !vData.li.pg.pa) {
				vData.li.dr = Object.keys(vData.li.dt)
				vData.li.pg.pa = vData.li.dr.length;
			}
		},
		saiInitSearch(vData) {
			if (this.saiCheckData(vData) && vData.db.ds.length) {
				let searchData = [{
					tt: '默认',
					sn: ''
				}];
				vData.db.ds.forEach(key => {
					let keyIndex = vData.db.dn.findIndex(val => val === key);
					searchData.push({
						tt: vData.db.dc[keyIndex],
						sn: key
					});
				});
				this.dataLi.listSearch.ds = searchData;
			}
		},
		saiBar(vKey, vVal) {
			this.dataLi.topBar[vKey] = vVal;
		},
		saiInitIndex() {
			this.saiInit(this.dataLi.indexObj);
			this.saiBar('index', {
				tt: '主页',
				ur: 'index'
			});
		},
		saiInitList(vLi) {
			this.saiInit(this.dataLi.listObj);
			this.saiBar('index', {
				tt: '主页',
				ur: 'index'
			});
			this.saiBar('list', {
				tt: '列表',
				ur: '?li=' + this.dataLi.listSn
			});
		},
		saiLoad(e) {
			this.dataLi.indexObj = this.saiRead('');
			if (this.checkObj(this.dataLi.indexObj)) {
				this.saiInitIndex();
				if (e.li) {
					this.dataLi.listSn = e.li;
					if (this.checkObj(this.dataLi.listObj)) {
						this.saiInitList();
						if (e.sn) {
							this.dataLi.viewSn = e.sn;
							this.saiBar('show', {
								tt: '详情',
								ur: ''
							});
							this.saiBar('tool', {});
						} else {
							this.dataLi.viewSn = '';
							this.saiBar('tool', {
								tt: '下载',
								ur: '?li=' + this.dataLi.listSn
							});
							this.saiBar('show', {});
							this.saiPage(this.dataLi.listObj, e);
							this.saiSearch(this.dataLi.listObj, e);
						}
					}
				} else {
					this.dataLi.listSn = '';
					this.dataLi.viewSn = '';
					this.saiBar('list', {});
					this.saiBar('show', {});
					this.saiBar('tool', {});
					this.saiPage(this.dataLi.indexObj, e);
					this.saiSearch(this.dataLi.indexObj, e);
				}
			}
		},
		saiPage(vData, e) {
			if (this.saiCheckData(vData)) {
				if (e.page) {
					this.dataLi.listPage.pc = e.page;
				} else {
					this.dataLi.listPage.pc = 1;
				}
				if (e.pagesize) {
					this.dataLi.listPage.ps = e.pagesize;
				} else {
					this.dataLi.listPage.ps = vData.li.pg.ps;
				}
				if (!this.dataLi.listPage.pa && vData.li.pg.pa) {
					this.dataLi.listPage.pa = vData.li.pg.pa;
				}
			}
		},
		saiSearch(vData, e) {
			if (this.saiCheckData(vData)) {
				if (e.ty) {
					this.dataLi.listSearch.ty = +e.ty;
				} else {
					this.dataLi.listSearch.ty = 0;
				}
				if (e.ss) {
					this.dataLi.listSearch.ss = e.ss;
					let curKey = this.saiSearchKey();
					if (!this.dataLi.listSearch.dr[curKey]) {
						let curLists = [];
						Object.keys(vData.li.dt).forEach(key => {
							if (this.saiSearchCheck(vData, this.dataLi.listSearch, key)) {
								curLists.push(key);
							}
						});
						this.dataLi.listSearch.dr = {};
						this.dataLi.listSearch.dr[curKey] = curLists;
						this.dataLi.listPage.pa = curLists.length;
					}
				} else {
					this.dataLi.listSearch.ss = '';
					this.dataLi.listSearch.dr = {};
					this.dataLi.listPage.pa = vData.li.pg.pa;
				}
			}
		},
		saiCheckData(vData) {
			return vData && vData.li && vData.li.pg;
		},
		saiSearchKey() {
			return 'sai' + this.dataLi.listSearch.ty + this.dataLi.listSearch.ss;
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
