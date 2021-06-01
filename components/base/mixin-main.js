import mixinMainList from './mixin-main-list.js';
import bar from '../bar/bar.vue';
import list from '../list/list.vue';
import show from '../show/show.vue';
import quickMenu from '../quick-menu/quick-menu.vue';

export default {
	mixins: [mixinMainList],
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
		initOnLoad(e, sn) {
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
					// 获取index信息
					this.indexSn = sn;
					if (this.indexSn) {
						this.$asaidata
							.get('/' + this.indexSn + '/li', 0)
							.then((res) => {
								this.indexCur = res;
								// 获取index=>list信息
								this.listSn = e.li || '';
								if (this.listSn) {
									this.$asaidata
										.get('/' + this.indexSn + '/co/' + this.listSn, 0)
										.then((res) => {
											this.listCur = res;
											// 获取index=>list=>view信息
											if (e.sn) {
												this.viewSn = e.sn;
												this.setTopBar('show', {
													tt: '详情',
													ur: ''
												});
												this.setTopBar('tool', {});
											} else {
												this.initList(this.listSn, this.listCur);
												this.saiPage(this.listCur, e);
												this.saiSearch(this.listCur, e);
											}
										});
								} else {
									this.initIndex(this.indexCur);
									this.saiPage(this.indexCur, e);
									this.saiSearch(this.indexCur, e);
								}
							});
					}
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
			this.$asaidata.clear();
		},
	}
};
