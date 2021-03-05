<template>
	<view class="s-area" v-if="item && item.ver">
		<search :item="psearch" :gli="gli"></search>
		<page :item="ppage" :psearch="psearch" :gli="gli"></page>
		<view v-if="item.ty && item.ty.li.startsWith('pic')" class="s-pic">
			<view class="s-list-li" v-for="(showItem, key, index) in curList" :key="key + index" @tap="viewGo(showItem, key)">
				<view class="s-v-img">
					<img v-if="viewImg(item, showItem)" :src="viewImg(item, showItem)" />
					<text v-if="viewDes(item, showItem)">{{ viewDes(item, showItem) }}</text>
				</view>
				<view class="s-v-tit" v-if="viewTit(item, showItem)">{{ viewTit(item, showItem) }}</view>
			</view>
		</view>
		<view v-else-if="item.ty && item.ty.li.startsWith('txt')" class="s-txt">
			<view class="s-list-li" v-for="(showItem, key, index) in curList" :key="key + index" @tap="viewGo(showItem, key)" :title="viewTit(item, showItem)">
				{{ viewTit(item, showItem) }}
			</view>
		</view>
		<view v-else class="s-list">
			<view :class="{ 's-listmin-li': item.ty.li === 'listmin' }" class="s-list-li" v-for="(showItem, key, index) in curList" :key="key + index" @tap="viewGo(showItem, key)">
				<view class="s-v-img" v-if="viewImg(item, showItem)"><img :src="viewImg(item, showItem)" /></view>
				<view class="s-list-txt">
					<view class="s-v-tit" v-if="viewTit(item, showItem)">{{ viewTit(item, showItem) }}</view>
					<view class="s-v-tag" v-if="viewTag(item, showItem)">{{ viewTag(item, showItem) }}</view>
					<view class="s-v-des" v-if="viewDes(item, showItem)">{{ saiHtml2Txt(viewDes(item, showItem), 200) }}</view>
				</view>
			</view>
		</view>
		<page :item="ppage" :psearch="psearch" :gli="gli"></page>
		<type :item="item"></type>
	</view>
</template>

<script>
import page from './page/page.vue';
import search from './search/search.vue';
import type from './type/type.vue';
import mixinComponent from '../base/mixin-component.js';
import mixinMainList from '../base/mixin-main-list.js';

export default {
	mixins: [mixinComponent, mixinMainList],
	components: { page, search, type },
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
	data() {
		return {
			allList: []
		};
	},
	created() {
		if (this.psearch.ss) {
			this.allList = this.psearch.dr[this.saiSearchKey(this.item)] || [];
		} else {
			this.allList = this.item.li.dr;
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
			let vUr = this.getValue(this.item, vValue, 'ur');
			if (vUr) {
				vUrl = vUrl + '&ur=' + vUr;
			}
			this.go(vUrl);
		},
		curView(vSn) {
			if (this.gli) {
				return '?sn=' + vSn + '&li=' + this.gli;
			} else {
				return '?li=' + vSn;
			}
		}
	}
};
</script>

<style></style>
