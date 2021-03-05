<template>
	<view class="s-area">
		<view class="s-show">
			<view class="s-v-tit" v-if="viewTit(item, showItem)">{{ viewTit(item, showItem) }}</view>
			<view class="s-v-tag" v-if="viewTag(item, showItem)">{{ viewTag(item, showItem) }}</view>
			<view class="s-v-img" v-if="viewImg(item, showItem)"><img :src="viewImg(item, showItem)" /></view>
			<rich-text class="s-v-des" v-if="viewDes(item, showItem)" :nodes="viewDes(item, showItem)"></rich-text>
		</view>
		<view class="s-fast">
			<view class="s-fast-left" v-if="fastData.left.url" @tap="go(fastData.left.url)">{{ fastData.left.tit }}</view>
			<view class="s-fast-right" v-if="fastData.right.url" @tap="go(fastData.right.url)">{{ fastData.right.tit }}</view>
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
	data() {
		return {
			fastData: {
				left: {
					tit: '',
					url: ''
				},
				right: {
					tit: '',
					url: ''
				}
			}
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
		showItem() {
			if (this.gsn) {
				return this.item.li.dt[this.gsn];
			} else {
				return {};
			}
		}
	},
	created() {
		let newUrl = '?';
		if (this.gli) {
			newUrl += 'li=' + this.gli + '&';
		}
		if (this.gsn) {
			let vSn = '';
			let vArr = this.item.li.dr;
			let vLen = vArr.length;
			let vIndex = vArr.findIndex(itemVal => itemVal === this.gsn);
			if (vIndex > 0) {
				vSn = vArr[vIndex - 1];
				if (vSn) {
					this.fastData.left.url = newUrl + 'sn=' + vSn;
					this.fastData.left.tit = this.viewTit(this.item, this.item.li.dt[vSn]);
				}
			}
			if (vIndex + 1 < vLen) {
				vSn = vArr[vIndex + 1];
				if (vSn) {
					this.fastData.right.url = newUrl + 'sn=' + vSn;
					this.fastData.right.tit = this.viewTit(this.item, this.item.li.dt[vSn]);
				}
			}
		}
	}
};
</script>

<style></style>
