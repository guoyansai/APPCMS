import mixinMainList from './mixin-main-list.js';
import bar from '../bar/bar.vue';
import list from '../list/list.vue';
import show from '../show/show.vue';

export default {
	mixins: [mixinMainList],
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
			listUr: '',
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
				pa: 0,
				ur: ''
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
	methods: {
		initOnLoad(e, sn) {
			try {
				if (e.ur && (e.ur.indexOf('//') !== -1 || e.ur.startsWith('http'))) {
					this.viewSn = '';
					this.viewUr = e.ur;
					this.setTopBar('show', {
						tt: '网页',
						ur: ''
					});
				} else {
					this.listUr = e.ur;
					this.viewUr = '';
					// 获取index信息
					this.indexSn = sn;
					if (this.indexSn) {
						this.$asaidata
							.get('/' + this.indexSn + '/li', 0)
							.then((resIndex) => {
								this.indexCur = resIndex;
								this.setTopBar('index', {
									tt: this.indexCur.tt,
									ur: 'index'
								});
								// 获取index=>list信息
								this.listSn = e.li || '';
								if (this.listSn) {
									let listUrl = e.ur || '';
									let urQurey = '';
									if (listUrl) {
										urQurey = '&ur=' + listUrl;
										listUrl = listUrl + '/';
									}
									this.$asaidata
										.get('/' + this.indexSn + '/co/' + listUrl + this.listSn + '/co', 0)
										.then((res) => {
											this.listCur = res;
											this.setTopBar('list', {
												tt: res.tt,
												ur: '?li=' + this.listSn + urQurey
											});
											// 获取index=>list=>view信息
											this.saiInit(res);
											this.saiSearch(res, e);
											if (e.sn) {
												this.viewSn = e.sn;
												this.setTopBar('show', {
													tt: '详情',
													ur: ''
												});
												this.setTopBar('tool', {});
											} else {
												this.saiPage(res, e);
											}
										});
								} else {
									this.saiInit(resIndex);
									this.saiPage(resIndex, e);
									this.saiSearch(resIndex, e);
								}
							});
					}
				}
			} catch (err) {
				this.goTab();
			}
		},
		setTopBar(vKey, vVal) {
			this.topBar[vKey] = vVal;
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
			if (this.listPage.pa !== vData.li.pg.pa) {
				this.listPage.pa = vData.li.pg.pa;
			}
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
	}
};
