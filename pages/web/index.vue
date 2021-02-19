<template>
	<view class="index-web">
		<bar :item="topBar"></bar>
		<show v-if="viewSn" :sn="viewSn" :item="listObj"></show>
		<list v-else-if="listSn" :item="listObj" :ppage="listPage" :psearch="listSearch" :li="listSn"></list>
		<list v-else :item="indexObj" :ppage="listPage" :psearch="listSearch"></list>
	</view>
</template>

<script>
export default {
	data() {
		return {
			listObj: {},
			indexObj: {},

			viewSn: '',
			listSn: '',
			topBar: {
				index: {},
				list: {},
				show: {},
				tool: {}
			},
			listPage: {
				pc: 1,
				ps: 10,
				pa: 0
			},
			listSearch: {
				dr: {},
				ds: [],
				cl: '',
				ty: 0,
				ss: ''
			}
		};
	},
	onLoad(e) {
		this.init(e);
	},
	methods: {
		init(e) {
			this.initData(e.li);
			if (e.sn) {
				this.viewSn = e.sn;
				this.setTopBar('show', {
					tt: '详情',
					ur: ''
				});
				this.setTopBar('tool', {});
			} else if (e.li) {
				this.saiPage(this.listObj, e);
				this.saiSearch(this.listObj, e);
			} else {
				this.saiPage(this.indexObj, e);
				this.saiSearch(this.indexObj, e);
			}
		},
		initData(vLi) {
			this.dataLi.indexObj = this.indexObj = this.saiReadSync('');
			if (!this.indexObj.ver) {
				this.initApi('');
			} else {
				this.initIndex(this.indexObj);
			}
			if (vLi) {
				this.listSn = vLi;
				this.dataLi.listObj = this.listObj = this.saiReadSync(this.listSn);
				if (!this.listObj.ver) {
					this.initApi(vLi);
				} else {
					this.initList(this.listObj, vLi);
				}
			}
			console.log(666.666, this.indexObj.ver, this.listObj.ver);
		},
		initApi(vLi) {
			let vUrl = this.saiUrl(vLi, 0);
			uni.request({
				url: vUrl,
				success: res => {
					console.log(666.10008, res);
					let vVal = res.data;
					if (vVal && vVal.ver) {
						this.saiAutoLocal(vVal, vLi);
						if (vLi) {
							this.dataLi.listObj = this.listObj = vVal;
							this.initList(this.listObj, vLi);
						} else {
							this.dataLi.indexObj = this.indexObj = vVal;
							this.initIndex(this.indexObj);
						}
					} else {
						console.log(666.10007, 'err');
					}
				},
				fail: err => {
					console.log(666.10006, err);
				}
			});
		},
		setTopBar(vKey, vVal) {
			this.topBar[vKey] = vVal;
		},
		initIndex(vData) {
			this.saiInit(vData);
			this.setTopBar('index', {
				tt: '主页',
				ur: 'index'
			});
		},
		initList(vData, vLi) {
			this.saiInit(vData);
			this.setTopBar('index', {
				tt: '主页',
				ur: 'index'
			});
			this.setTopBar('list', {
				tt: '列表',
				ur: '?li=' + vLi
			});
			this.setTopBar('tool', {
				tt: '下载',
				ur: '?li=' + vLi
			});
		},
		saiInit(vData) {
			this.initPage(vData);
			this.initSearch(vData);
		},
		initPage(vData) {
			if (this.saiCheckData(vData) && !vData.li.pg.pa) {
				vData.li.dr = Object.keys(vData.li.dt);
				vData.li.pg.pa = vData.li.dr.length;
				this.listPage.pa = vData.li.pg.pa;
			}
		},
		initSearch(vData) {
			if (this.saiCheckData(vData) && vData.db.ds.length) {
				let searchData = [
					{
						tt: '默认',
						sn: ''
					}
				];
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
		clear() {
			this.saiDel();
			this.listObj = {};
			this.indexObj = {};
			this.viewSn = '';
			this.listSn = '';
		}
	}
};
</script>

<style></style>
