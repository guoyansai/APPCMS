<template>
	<view class="s-area">
		<view class="s-url" v-if="gur"><web-view :src="gur"></web-view></view>
		<view class="s-show" v-else>
			<view class="s-show-tit">{{ showVal('tt') }}</view>
			<view class="s-show-tag">时间: {{ showVal('cd') }} 作者: {{ showVal('us') }}</view>
			<view class="s-show-img"><img :src="showVal('ic')" /></view>
			<rich-text class="s-show-des" :nodes="showVal('co')"></rich-text>
		</view>
	</view>
</template>

<script>
export default {
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
		},
		gur: {
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
		showVal() {
			return vKey => {
				console.log(666.123456, vKey);
				let vIndex = this.item.db.dn.findIndex(itemVal => itemVal === vKey);
				console.log(666.123456, vIndex, this.item, this.glist, this.gindex);
				let vValue = this.item.li.dt[this.gsn];
				console.log(666.123456, this.item.li.dt, vValue);
				console.log(666.123456, vValue[vIndex]);
				return vValue[vIndex];
			};
		}
	}
};
</script>

<style></style>
