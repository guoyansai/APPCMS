<template>
	<view class="s-show-area">
		<view :id="$config.ids.search" class="s-show">
			<view class="s-v-tit" v-if="viewTit(item, showItem)">
				{{ (item.ty.co.startsWith('novel')?'第'+getValue(item, showItem, 'sn')+'章 ':'')+viewTit(item, showItem) }}
			</view>
			<view class="s-v-tag" v-if="viewTag(item, showItem)">{{ viewTag(item, showItem) }}</view>
			<rich-text class="s-v-more" v-if="viewMore(item, showItem)&&item.ty.co.startsWith('novel')"
				:nodes="viewMore(item, showItem)"></rich-text>
			<view class="s-v-img" v-if="viewImg(item, showItem)"><img class="s-v-img-show"
					:src="viewImg(item, showItem)" /></view>
			<rich-text class="s-v-des" v-if="viewDes(item, showItem)" :nodes="viewDes(item, showItem)"></rich-text>
			<rich-text class="s-v-more" v-if="viewMore(item, showItem)&&!item.ty.co.startsWith('novel')"
				:nodes="viewMore(item, showItem)"></rich-text>
		</view>
		<view class="s-fast">
			<view class="s-fast-left s-tap" v-if="fastData.left.url" @tap="go(fastData.left.url)">
				{{ fastData.left.tit }}
			</view>
			<view class="s-fast-left" v-else>　</view>
			<view class="s-fast-right s-tap" v-if="fastData.right.url" @tap="go(fastData.right.url)">
				{{ fastData.right.tit }}
			</view>
			<view class="s-fast-left" v-else>　</view>
		</view>
	</view>
</template>

<script>
	import mixinComponent from '../base/mixin-component.js';

	export default {
		mixins: [mixinComponent],
		computed: {
			showItem() {
				if (this.gsn) {
					return this.item.li.dt[this.gsn];
				} else {
					return {};
				}
			},
			fastData() {
				let tmpData = {
					left: {
						tit: '',
						url: ''
					},
					right: {
						tit: '',
						url: ''
					}
				};
				if (this.gsn) {
					let vSn = '';
					let vLen = this.allList.length;
					let vIndex = this.allList.findIndex(itemVal => itemVal === this.gsn);
					if (vIndex > 0) {
						vSn = this.allList[vIndex - 1];
						if (vSn) {
							tmpData.left.url = this.curView(vSn);
							tmpData.left.tit = this.viewNear(this.item, this.item.li.dt[vSn]);
						}
					}
					if (vIndex + 1 < vLen) {
						vSn = this.allList[vIndex + 1];
						if (vSn) {
							tmpData.right.url = this.curView(vSn);
							tmpData.right.tit = this.viewNear(this.item, this.item.li.dt[vSn]);
						}
					}
				}
				return tmpData;
			}
		},
	};
</script>

<style>
</style>
