import mixinMainList from './mixin-main-list.js';
import mixinMainLocal from './mixin-main-local.js';

export default {
	mixins: [mixinMainList, mixinMainLocal],
	data() {
		return {
			listObj: {},
			indexObj: {},

			indexSn: '',
			listSn: '',
			viewSn: '',
			viewUr: '',
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
	computed: {
		canShow() {
			if (this.viewUr) {
				return true;
			} else if (this.listSn) {
				return this.listObj.ver;
			} else {
				return this.indexObj.ver;
			}
		}
	},
	onLoad() {
		uni.$on('clear', res => {
			this.clear();
		});
	},
	onUnload() {
		uni.$off('clear');
	},
	onNavigationBarButtonTap(e) {
		this.goTab();
	},
	methods: {
		initStart(e, sn) {
			this.indexSn = sn || 'local';
			let Vli = e.li;
			let gData = this['data' + this.indexSn];
			if (Vli) {
				if (gData.listObj && gData.listObj.ver && gData.listObj.sn === Vli) {
					this.listObj = gData.listObj;
				} else {
					gData.listObj = this.listObj = this.saiLocalInit(Vli, this.indexSn);
				}
			} else {
				if (gData.indexObj && gData.indexObj.ver) {
					this.indexObj = gData.indexObj;
				} else {
					gData.indexObj = this.indexObj = this.saiLocalInit('', this.indexSn);
				}
			}
			this.init(e);
		},
		init(e) {
			this.initData(e);
			if (e.ur) {
				this.viewSn = '';
				this.viewUr = e.ur;
				this.setTopBar('show', {
					tt: '网页',
					ur: ''
				});
			} else if (e.sn) {
				this.viewUr = '';
				this.viewSn = e.sn;
				this.setTopBar('show', {
					tt: '详情',
					ur: ''
				});
			}
			this.setTopBar('tool', {});
			if (e.li) {
				this.saiPage(this.listObj, e);
				this.saiSearch(this.listObj, e);
			} else {
				this.saiPage(this.indexObj, e);
				this.saiSearch(this.indexObj, e);
			}
		},
		initData(e) {
			if (e.ur) {

			} else if (e.li) {
				this.listSn = e.li;
				if (this.listObj.ver) {
					this.initList(this.listObj, this.listSn);
				} else {
					this.initApi(this.listSn);
				}
			} else if (this.indexObj.ver) {
				this.initIndex(this.indexObj);
			} else {
				this.initApi('');
			}
		},
		saiUrl(vLi, vType) {
			let vUrl = this.$config.baseURL + '/' + this.indexSn;
			if (vLi) {
				vUrl += '/' + vLi;
				if (vType) {
					vUrl += '/ver.json';
				} else {
					vUrl += '/co.json';
				}
			} else {
				if (vType) {
					vUrl += '/ver.json';
				} else {
					vUrl += '/li.json';
				}
			}
			return vUrl + '?' + Date.now();
		},
		initApi(vLi) {
			let vUrl = this.saiUrl(vLi, 0);
			uni.request({
				url: vUrl,
				success: res => {
					let vVal = res.data;
					if (vVal && vVal.ver) {
						this.saiLocalAuto(vVal, vLi, this.indexSn);
						if (vLi) {
							this.listObj = vVal;
							this.initList(this.listObj, vLi);
						} else {
							this.indexObj = vVal;
							this.initIndex(this.indexObj);
						}
					}
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
			}
			this.listPage.pa = vData.li.pg.pa;
		},
		initSearch(vData) {
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
		clear() {
			this.saiLocalClear(this.indexSn);
			this.$global['data' + this.indexSn].listObj = {};
			this.$global['data' + this.indexSn].indexObj = {};
			this.listObj = {};
			this.indexObj = {};
			this.viewUr = '';
			this.viewSn = '';
			this.listSn = '';
			this.indexSn = '';
			this.goTab();
		},
	}
};
