import mixinMainList from './mixin-main-list.js';
import mixinMainLocal from './mixin-main-local.js';
import mixinMainApi from './mixin-main-api.js';
import bar from '../bar/bar.vue';
import list from '../list/list.vue';
import show from '../show/show.vue';

export default {
	mixins: [mixinMainList, mixinMainLocal, mixinMainApi],
	components: {
		bar,
		list,
		show,
	},
	data() {
		return {
			Timer: null,
			Loader: false,

			listCur: {},
			indexCur: {},

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
				return this.listCur.ver;
			} else {
				return this.indexCur.ver;
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
	onPullDownRefresh() {
		this.clear();
		this.goFresh();
		this.initStart({
			li: this.listSn
		}, this.indexSn);
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, this.$config.time.refresh);
	},
	methods: {
		initStart(e, sn) {
			try {
				this.indexSn = sn || 'local';
				this.listSn = e.li;
				let gData = this.$global.G['data' + this.indexSn];
				this.initIndexObj(gData);
				if (this.listSn) {
					if (gData.listObj && gData.listObj.ver && gData.listObj.sn === this.listSn) {
						this.listCur = gData.listObj;
					} else {
						this.setListObj(gData, this.saiLocalInit(this.listSn, this.indexSn));
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
				this.indexCur = gData.indexObj;
			} else {
				this.setIndexObj(gData, this.saiLocalInit('', this.indexSn));
			}
		},
		setListObj(gData, vObj) {
			this.listCur = this.listCur || {};
			Object.assign(this.listCur, vObj);
			gData.listObj = this.listCur;
		},
		setIndexObj(gData, vObj) {
			this.indexCur = this.indexCur || {};
			Object.assign(this.indexCur, vObj);
			gData.indexObj = this.indexCur;
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
				this.saiPage(this.listCur, e);
				this.saiSearch(this.listCur, e);
			} else {
				this.saiPage(this.indexCur, e);
				this.saiSearch(this.indexCur, e);
			}
		},
		initData(e) {
			this.listSn = e.li || '';
			if (e.ur) {} else if (this.listSn) {
				this.initLi();
			} else if (this.indexCur.ver) {
				this.initIndex(this.indexCur);
			} else {
				this.initApi(this.listSn, this.indexCur);
			}
		},
		initLi() {
			if (this.listCur.ver) {
				this.initList(this.listSn, this.listCur);
			} else {
				this.initApi(this.listSn, this.indexCur);
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
		initList(vLi, vData) {
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

			this.$global.G['data' + this.indexSn].listObj = {};
			this.$global.G['data' + this.indexSn].indexObj = {};

			this.listSn && (this.listSn = '');
			this.viewSn && (this.viewSn = '');
			this.viewUr && (this.viewUr = '');
			clearTimeout(this.Timer);
			this.Timer = setTimeout(() => {
				this.loadClose();
				this.goTab();
				clearTimeout(this.Timer);
			}, this.$config.time.clear);
		},
	}
};
