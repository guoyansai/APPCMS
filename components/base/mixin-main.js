import mixinMainList from './mixin-main-list.js';
import mixinMainLocal from './mixin-main-local.js';
import mixinMainApi from './mixin-main-api.js';
import bar from '../bar/bar.vue';
import list from '../list/list.vue';
import show from '../show/show.vue';
import quickMenu from '../quick-menu/quick-menu.vue';

export default {
	mixins: [mixinMainList, mixinMainLocal, mixinMainApi],
	components: {
		bar,
		list,
		show,
		quickMenu,
	},
	data() {
		return {
			quickMenu: false,
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
	onShow: function() {
		uni.$on('clear', res => {
			this.clear();
		});
	},
	onUnload: function() {
		uni.$off('clear');
	},
	onNavigationBarButtonTap(e) {
		console.log(666.11223, 'menu', e)
		if (e.type === 'home') {
			this.goTab();
		} else if (e.type === 'menu') {
			this.quickMenu = !this.quickMenu;
		}
	},
	methods: {
		async initOnLoad(e, sn) {
			try {
				if (e.ur) {
					this.viewSn = '';
					this.viewUr = e.ur;
					this.setTopBar('show', {
						tt: '网页',
						ur: ''
					});
				} else {
					this.viewUr = '';
					this.indexSn = sn || 'local';
					let gData = this.$global.G['data' + this.indexSn];

					// 获取index信息
					if (gData.indexObj && gData.indexObj.ver) {
						this.indexCur = gData.indexObj;
					} else {
						this.indexCur = await this.saiGetData('', this.indexSn);
						gData.indexObj = this.indexCur;
					}
					if (this.indexCur.ver) {
						this.initIndex(this.indexCur);
					} else {
						this.initApi();
					}

					// 获取index=>list信息
					this.listSn = e.li || '';
					if (this.listSn) {
						if (gData.listObj && gData.listObj.ver && gData.listObj.sn === this.listSn) {
							this.listCur = gData.listObj;
						} else {
							this.listCur = await this.saiGetData(this.listSn, this.indexSn);
							gData.listObj = this.listCur;
						}
						if (this.listCur.ver) {
							this.initList(this.listSn, this.listCur);
						} else {
							this.initApi(this.listSn, this.indexCur);
						}
						this.saiPage(this.listCur, e);
						this.saiSearch(this.listCur, e);
					} else {
						this.saiPage(this.indexCur, e);
						this.saiSearch(this.indexCur, e);
					}

					// 获取index=>list=>view信息
					if (e.sn) {
						this.viewSn = e.sn;
						this.setTopBar('show', {
							tt: '详情',
							ur: ''
						});
					}

					this.setTopBar('tool', {});
				}
			} catch (err) {
				console.log(666.111, err);
				this.goTab();
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
		closeMenu() {
			this.quickMenu = false;
		},
		clear() {
			this.loadShow({
				title: '正在清理...'
			});
			this.saiLocalClear(this.indexSn);

			this.$global.G = JSON.parse(JSON.stringify(this.$global.IG));

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
