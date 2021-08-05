import mixinMainList from './mixin-main-list.js';
import {
	RandomBgColor,
	RandomFontColor
} from '../../asai/js/random-color.js';

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
					pc: 0,
					ps: 0,
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
		gur: {
			type: String,
			required: false
		},
		gsn: {
			type: String,
			required: false
		},
		apiUrl: {
			type: String,
			required: false
		},
	},
	computed: {
		item() {
			if (this.gli) {
				return this.glist;
			} else {
				return this.gindex;
			}
		},
		allList() {
			if (this.psearch.ss) {
				return this.psearch.dr[this.saiSearchKey(this.item, this.psearch)] || [];
			} else {
				return this.item?.li?.dr;
			}
		}
	},
	methods: {
		ranColor() {
			return 'background-color:' + RandomBgColor() + ';color:' + RandomFontColor() + ';';
		},
		curView(vSn) {
			let vUrl = '';
			if (this.gli) {
				vUrl = '?sn=' + vSn + '&li=' + this.gli;
			} else {
				vUrl = '?li=' + vSn;
			}
			if (this.gur) {
				vUrl += '&ur=' + this.gur;
			}
			if (this.psearch.ss) {
				vUrl += '&ss=' + this.saiEncode(this.psearch.ss);
			}
			if (this.psearch.ty) {
				vUrl += '&ty=' + this.psearch.ty;
			}
			return vUrl;
		},
		viewTit(listItem, showItem) {
			return this.getValue(listItem, showItem, 'tt');
		},
		viewNear(listItem, showItem) {
			return this.getValue(listItem, showItem, 'tt') || this.getValue(listItem, showItem, 'co');
		},
		viewTag(listItem, showItem) {
			return this.getValArr(listItem, showItem, this.$config.listTag, 1);
		},
		viewImg(listItem, showItem) {
			return this.getValue(listItem, showItem, 'ic');
		},
		richColor(val) {
			let vVal = val;
			if (this.psearch.ss) {
				let aorekey = new RegExp('(' + this.psearch.ss + ')', 'gi');
				vVal = vVal.replace(aorekey, '<span style="' + this.ranColor() + '">$1</span>');
			}
			return vVal;
		},
		viewDes(listItem, showItem) {
			return this.richColor(this.getValue(listItem, showItem, 'co'));
		},
		viewMore(listItem, showItem) {
			return this.richColor(this.getValue(listItem, showItem, 'mo'));
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
