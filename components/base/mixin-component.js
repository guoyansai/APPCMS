import mixinMainList from './mixin-main-list.js';

export default {
	mixins: [mixinMainList],
	props: {
		gindex: {
			type: Object,
			required: false,
			default: function() {
				return {
					tt: '',
					db: {},
					li: {
						pg: {},
						dt: {}
					}
				};
			}
		},
		glist: {
			type: Object,
			required: false,
			default: function() {
				return {
					tt: '',
					db: {},
					li: {
						pg: {},
						dt: {}
					}
				};
			}
		},
		ppage: {
			type: Object,
			required: false,
			default: function() {
				return {
					pc: 1,
					ps: 10,
					pa: 0
				};
			}
		},
		psearch: {
			type: Object,
			required: false,
			default: function() {
				return {
					dr: {},
					ds: [],
					cl: '',
					ty: 0,
					ss: ''
				};
			}
		},
		gli: {
			type: String,
			required: false
		},
		gsn: {
			type: String,
			required: false
		}
	},
	data() {
		return {
			allList: []
		};
	},
	computed: {
		item() {
			if (this.gli) {
				return this.glist;
			} else {
				return this.gindex;
			}
		},
	},
	created() {
		if (this.psearch.ss) {
			this.allList = this.psearch.dr[this.saiSearchKey(this.item)] || [];
		} else {
			this.allList = this.item.li.dr;
		}
	},
	methods: {
		curView(vSn) {
			let vUrl = '';
			if (this.gli) {
				vUrl = '?sn=' + vSn + '&li=' + this.gli;
			} else {
				vUrl = '?li=' + vSn;
			}
			if (this.psearch.ss) {
				vUrl += '&ss=' + this.psearch.ss;
			}
			if (this.psearch.ty) {
				vUrl += '&ty=' + this.psearch.ty;
			}
			return vUrl;
		},
		viewTit(listItem, showItem) {
			// const dnArr = [
			// 	"id",
			// 	"sn",
			// 	"tt",
			// ];
			// return this.getValArr(listItem, showItem, dnArr, 0);
			return this.getValue(listItem, showItem, 'tt');
		},
		viewTag(listItem, showItem) {
			const dnArr = [
				"us",
				"ur",
				"cd",
				"rd",
				"xy"
			];
			return this.getValArr(listItem, showItem, dnArr, 1);
		},
		viewImg(listItem, showItem) {
			return this.getValue(listItem, showItem, 'ic');
		},
		viewDes(listItem, showItem) {
			return this.getValue(listItem, showItem, 'co');
		},
		viewMore(listItem, showItem) {
			return this.getValue(listItem, showItem, 'mo');
		},
		getValue(listItem, showItem, vKey) {
			return this.saiGetVal(listItem, showItem, vKey, 0);
		},
		getValArr(listItem, showItem, vArr, vType) {
			let vVal = '';
			vArr.forEach(val => {
				let tempVal = this.saiGetVal(listItem, showItem, val, vType);
				if (tempVal) {
					vVal = vVal + tempVal + ' ';
				}
			});
			return vVal;
		},
	},
};
