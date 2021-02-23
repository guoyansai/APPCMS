<template>
	<view class="s-area" v-if="item && item.ver">
		<search :item="psearch" :gli="gli"></search>
		<page :item="ppage" :psearch="psearch" :gli="gli"></page>
		<view v-if="item.ty && item.ty.li.startsWith('list')" class="s-list">
			<view :class="{ 's-listmin-li': item.ty.li === 'listmin' }" class="s-list-li" v-for="(value, key, index) in curList" :key="key + index" @tap="viewGo(value, key)">
				<view class="s-list-img" v-if="listVal('ic', value)"><img :src="listVal('ic', value)" /></view>
				<view class="s-list-txt">
					<view class="s-list-tit">{{ listVal('tt', value) }}</view>
					<view class="s-list-tag">时间: {{ listVal('cd', value) }} 作者: {{ listVal('us', value) }}</view>
					<view class="s-list-des">{{ saiHtml2Txt(listVal('co', value), 200) }}</view>
				</view>
			</view>
		</view>
		<view v-else :class="'s-' + item.ty.li">
			<view class="s-list-li" v-for="(value, key, index) in curList" :key="key + index" @tap="viewGo(value, key)">
				<view class="s-list-img">
					<img v-if="listVal('ic', value)" :src="listVal('ic', value)" />
					<text>{{ listVal('tt', value) }}</text>
				</view>
				<view class="s-list-tit">{{ listVal('tt', value) }}</view>
			</view>
		</view>
		<page :item="ppage" :psearch="psearch" :gli="gli"></page>
	</view>
</template>

<script>
import page from './page/page.vue';
import search from './search/search.vue';

export default {
	components: { page, search },
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
		}
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
				return this.psearch.dr[this.saiSearchKey(this.item)] || [];
			} else {
				return this.item.li.dr;
			}
		},
		curList() {
			const objList = {};
			if (this.allList.length) {
				let arrList = this.allList.slice((this.ppage.pc - 1) * this.ppage.ps, this.ppage.pc * this.ppage.ps);
				arrList.forEach(key => {
					objList[key] = this.item.li.dt[key];
				});
			}
			return objList;
		}
	},
	methods: {
		viewGo(vValue, vSn) {
			let vUrl = this.curView(vSn);
			let vUr = this.listVal('ur', vValue);
			if (vUr) {
				vUrl += '&ur=' + vUr;
			}
			console.log(666.888, vUrl, vValue);
			this.go(vUrl);
		},
		curView(vSn) {
			if (this.gli) {
				return '?sn=' + vSn + '&li=' + this.gli;
			} else {
				return '?li=' + vSn;
			}
		},
		listVal(vKey, vValue) {
			let vIndex = this.item.db.dn.findIndex(itemVal => itemVal === vKey);
			return vValue && vValue[vIndex];
		}
	}
};
</script>

<style></style>
