<template>
	<view class="s-area" v-if="item && item.ver">
		<search :item="psearch" :gli="gli"></search>
		<page :item="ppage" :psearch="psearch" :gli="gli"></page>
		<view :id="$config.ids.search" v-if="item.ty && item.ty.li.startsWith('pic')" class="s-pic">
			<view class="s-list-li" v-for="(showItem, key, index) in curList" :key="index" @tap="viewGo(showItem, key)">
				<view class="s-v-img">
					<img class="s-v-img-show" v-if="viewImg(item, showItem)" :src="viewImg(item, showItem)" />
					<text v-if="viewDes(item, showItem)">{{ viewDes(item, showItem) }}</text>
				</view>
				<view class="s-v-tit" v-if="viewTit(item, showItem)">{{ viewTit(item, showItem) }}</view>
			</view>
		</view>
		<view v-else-if="item.ty && item.ty.li.startsWith('txt')" class="s-txt">
			<view class="s-list-li" v-for="(showItem, key, index) in curList" :key="index" @tap="viewGo(showItem, key)"
				:title="viewTit(item, showItem)">
				{{ viewTit(item, showItem) }}
			</view>
		</view>
		<view :id="$config.ids.search" v-else class="s-list">
			<view :class="{ 's-listmin-li': item.ty.li === 'listmin' }" class="s-list-li"
				v-for="(showItem, key, index) in curList" :key="index" @tap="viewGo(showItem, key)">
				<view class="s-v-img" v-if="viewImg(item, showItem)"><img class="s-v-img-show"
						:src="viewImg(item, showItem)" /></view>
				<view class="s-list-txt">
					<view class="s-v-tit" v-if="viewTit(item, showItem)">{{ viewTit(item, showItem) }}</view>
					<view class="s-v-tag" v-if="viewTag(item, showItem)">{{ viewTag(item, showItem) }}</view>
					<view class="s-v-des" v-if="viewDes(item, showItem)">{{ saiHtml2Txt(viewDes(item, showItem), 200) }}
					</view>
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

	export default {
		mixins: [mixinComponent],
		components: {
			page,
			search,
			type
		},
		computed: {
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
				if (vUr && !vUr.startsWith('_')) {
					vUrl = vUrl + '&ur=' + vUr;
				}
				this.go(vUrl);
			}
		}
	};
</script>

<style></style>
