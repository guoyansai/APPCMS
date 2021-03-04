<template>
	<view class="s-area">
		<view class="s-show">
			<view class="s-v-tit" v-if="viewTit(item, showItem)">{{ viewTit(item, showItem) }}</view>
			<view class="s-v-tag" v-if="viewTag(item, showItem)">{{ viewTag(item, showItem) }}</view>
			<view class="s-v-img" v-if="viewImg(item, showItem)"><img :src="viewImg(item, showItem)" /></view>
			<rich-text class="s-v-des" v-if="viewDes(item, showItem)" :nodes="viewDes(item, showItem)"></rich-text>
		</view>
	</view>
</template>

<script>
import mixinComponent from '../base/mixin-component.js';

export default {
	mixins: [mixinComponent],
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
		gli: {
			type: String,
			required: false
		},
		gsn: {
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
		showItem() {
			if (this.gsn) {
				return this.item.li.dt[this.gsn];
			} else {
				return {};
			}
		}
	}
};
</script>

<style></style>
