import mixinMainList from './mixin-main-list.js';
import mixinMainLocal from './mixin-main-local.js';
import mixinMainApi from './mixin-main-api.js';
import {
	SearchColor
} from '../../asai/js/search-color.js';

export default {
	mixins: [mixinMainList, mixinMainLocal, mixinMainApi],
	data() {
		return {
			Timer: null,
			Loader: false,

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
			if (this.viewUr && !this.viewUr.startsWith('_')) {
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
	mounted() {
		if (this.listSearch.ss) {
			SearchColor(this.listSearch.ss, document.getElementById(this.$config.ids.search));
		}
	},
	onNavigationBarButtonTap(e) {
		this.goTab();
	},
	onPullDownRefresh() {
		this.goFresh();
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, this.$config.time.refresh);
	},
	methods: {
		initStart(e, sn) {
			try {
				this.indexSn = sn || 'local';
				let Vli = e.li;
				let gData = this['data' + this.indexSn];
				this.initIndexObj(gData);
				if (Vli) {
					if (gData.listObj && gData.listObj.ver && gData.listObj.sn === Vli) {
						this.listObj = gData.listObj;
					} else {
						gData.listObj = this.listObj = this.saiLocalInit(Vli, this.indexSn);
					}
				}
				this.init(e);
			} catch (err) {
				console.log(666.111, err);
				this.goTab();
			}
		},
		initIndexObj(gData) {
			if (gData.indexObj && gData.indexObj.ver) {
				this.indexObj = gData.indexObj;
			} else {
				gData.indexObj = this.indexObj = this.saiLocalInit('', this.indexSn);
			}
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
			this.listSn = e.li || '';
			if (e.ur) {} else if (this.listSn) {
				this.initLi();
			} else if (this.indexObj.ver) {
				this.initIndex(this.indexObj);
			} else {
				this.initApi(this.listSn, this.indexObj);
			}
		},
		initLi() {
			if (this.listObj.ver) {
				this.initList(this.listObj, this.listSn);
			} else {
				this.initApi(this.listSn, this.indexObj);
			}
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
			this.loadShow({
				title: '正在清理...'
			});
			this.saiLocalClear(this.indexSn);
			// this.listObj = {};
			// this.indexObj = {};

			// this.indexSn = '';
			// this.listSn = '';
			// this.viewSn = '';
			// this.viewUr = '';
			clearTimeout(this.Timer);
			this.Timer = setTimeout(() => {
				this.loadClose();
				this.goTab();
				clearTimeout(this.Timer);
			}, this.$config.time.clear);
		},
	}
};
