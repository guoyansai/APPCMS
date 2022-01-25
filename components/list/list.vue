<template>
	<view v-if="item && item.ver">
		<search :item="psearch" :gli="gli" :gur="gur"></search>

		<view :id="$config.ids.search" v-if="item.ty && item.ty.li.startsWith('pic')" class="s-pic">
			<view class="s-list-li" v-for="(showItem, key, index) in curList" :key="index" @tap="viewGo(showItem, key)">
				<view class="s-v-img" :style="ranColor()">
					<img class="s-v-img-show" v-if="viewImg(item, showItem)" :src="viewImg(item, showItem)" />
					<template v-else-if="viewDes(item, showItem)">
						<text class="s-v-img-txt">{{ viewTit(item, showItem).substr(0,4) }}</text>
						<text class="s-v-img-des">{{ saiHtml2Txt(viewDes(item, showItem), 200) }}</text>
					</template>
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
				<view class="s-v-img" v-if="viewImg(item, showItem)">
					<img class="s-v-img-show" :src="viewImg(item, showItem)" />
				</view>
				<view class="s-list-txt">
					<view class="s-v-tit" v-if="viewTit(item, showItem)">{{ viewTit(item, showItem) }}</view>
					<view class="s-v-tag" v-if="viewTag(item, showItem)">{{ viewTag(item, showItem) }}</view>
					<rich-text class="s-v-des" v-if="viewDes(item, showItem)&&item.ty.li === 'listmax'"
						:nodes="viewDes(item, showItem)"></rich-text>
					<view class="s-v-des" v-else-if="viewDes(item, showItem)">
						{{ saiHtml2Txt(viewDes(item, showItem), 200) }}
					</view>
					<view class="s-v-des" v-else></view>
				</view>
			</view>
		</view>

		<page :item="ppage" :psearch="psearch" :gli="gli" :gur="gur"></page>
		<type :item="item" :apiUrl="apiUrl"></type>
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
				if (this.allList && this.allList.length) {
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
					vUrl = vUrl + '&ur=' + vUr || '';
				}
				this.go(vUrl);
			}
		}
	};
</script>

<style></style>
