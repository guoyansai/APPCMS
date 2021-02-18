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
				this.listSearch.ds = searchData;
			}
		},
		saiBar(vKey, vVal) {
			this.dataBar[vKey] = vVal;
		},
		saiLoad(e, type) {
			this.saiRead('').then(resIndex => {
				console.log(666.20001, resIndex);
				this.dataIndex = resIndex;
				this.saiInit(this.dataIndex);
				if (this.checkObj(this.dataIndex)) {
					this.saiBar('index', {
						tt: '主页',
						ur: 'index'
					});
					if (e.li) {
						this.dataLi = e.li;
						this.saiRead(this.dataLi).then(resList => {
							console.log(666.30001, resList);
							this.dataList = resList;
							this.saiInit(this.dataList);
							if (this.checkObj(this.dataList)) {
								this.saiBar('list', {
									tt: '列表',
									ur: '?li=' + this.dataLi
								});
								if (e.sn) {
									this.dataSn = e.sn;
									this.saiBar('show', {
										tt: '详情',
										ur: ''
									});
									this.saiBar('tool', {});
								} else {
									this.dataSn = '';
									this.saiBar('tool', {
										tt: '下载',
										ur: '?li=' + this.dataLi
									});
									this.saiBar('show', {});
									this.saiPage(this.dataList, e);
									this.saiSearch(this.dataList, e);
								}
							}

						});
					} else {
						this.dataLi = '';
						this.dataSn = '';
						this.saiBar('list', {});
						this.saiBar('show', {});
						this.saiBar('tool', {});
						this.saiPage(this.dataIndex, e);
						this.saiSearch(this.dataIndex, e);
					}
				}
			});
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
		saiSearch(vData, e) {
			if (this.saiCheckData(vData)) {
				if (e.ty) {
					this.listSearch.ty = +e.ty;
				} else {
					this.listSearch.ty = 0;
				}
				if (e.ss) {
					this.listSearch.ss = e.ss;
					let curKey = this.saiSearchKey();
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
		saiCheckData(vData) {
			return vData && vData.li && vData.li.pg;
		},
		saiSearchKey() {
			return 'sai' + this.listSearch.ty + this.listSearch.ss;
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
