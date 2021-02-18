<template>
	<view class="s-area" v-if="saiCheckData(item)">
		<search :item="listSearch" :li="li"></search>
		<page :item="listPage" :li="li"></page>
		<view v-if="item.ty && item.ty.li.startsWith('list')" class="s-list">
			<view
				:class="{ 's-listmin-li': item.ty.li === 'listmin', 's-list-local': !li && asaiLocal(key) }"
				class="s-list-li"
				v-for="(value, key, index) in curList"
				:key="key + index"
				@tap="view(key)"
			>
				<view class="s-list-img" v-if="listVal('ic', value)"><img :src="listVal('ic', value)" /></view>
				<view class="s-list-txt">
					<view class="s-list-tit">{{ listVal('tt', value) }}</view>
					<view class="s-list-tag">时间: {{ listVal('cd', value) }} 作者: {{ listVal('us', value) }}</view>
					<view class="s-list-des">{{ saiHtml2Txt(listVal('co', value), 200) }}</view>
				</view>
			</view>
		</view>

		<view v-else :class="'s-' + item.ty.li">
			<view class="s-list-li" v-for="(value, key, index) in curList" :key="key + index" @tap="view(key)">
				<view class="s-list-img"><img :src="listVal('ic', value)" /></view>
				<view class="s-list-tit">{{ listVal('tt', value) }}</view>
			</view>
		</view>
		<page :item="listPage" :li="li"></page>
	</view>
</template>

<script>
import page from './page/page.vue';
import search from './search/search.vue';

export default {
	components: { page, search },
	props: {
		item: {
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
		li: {
			type: String,
			required: false
		}
	},
	computed: {
		allList() {
			if (this.listSearch.ss) {
				return this.listSearch.dr[this.saiSearchKey()];
			} else if (this.listSearch.cl) {
				return this.listSearch.dr[this.saiSearchKey()];
			} else {
				return this.item.li.dr;
			}
		},
		curList() {
			const objList = {};
			if (this.allList.length) {
				let arrList = this.allList.slice((this.listPage.pc - 1) * this.listPage.ps, this.listPage.pc * this.listPage.ps);
				arrList.forEach(key => {
					objList[key] = this.item.li.dt[key];
				});
			}
			return objList;
		}
	},
	methods: {
		view(vSn) {
			if (this.li) {
				this.go('?sn=' + vSn + '&li=' + this.li);
			} else {
				this.go('?li=' + vSn);
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
