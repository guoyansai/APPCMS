<template>
	<view class="s-area">
		<view class="s-show">
			<view class="s-show-tit">{{ showVal('tt', item) }}</view>
			<view class="s-show-tag">时间: {{ showVal('cd', item) }} 作者: {{ showVal('us', item) }}</view>
			<view class="s-show-img"><img :src="showVal('ic', item)" /></view>
			<rich-text class="s-show-des" :nodes="showVal('co', item)"></rich-text>
		</view>
	</view>
</template>

<script>
export default {
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
		sn: {
			type: String,
			required: false
		}
	},
	methods: {
		showVal(vKey) {
			let vIndex = this.item.db.dn.findIndex(itemVal => itemVal === vKey);
			let vValue = this.item.li.dt[this.sn];
			return vValue && vValue[vIndex];
		}
	}
};
</script>

<style></style>
