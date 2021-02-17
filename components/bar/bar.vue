<template>
	<view v-if="checkObj(item.index)" class="s-bar">
		<view class="s-bar-li" @tap="go(item.index.ur)">{{ item.index.tt }}</view>
		<view v-if="checkObj(item.list)" class="s-bar-li" @tap="go(item.list.ur)">{{ item.list.tt }}</view>
		<view v-if="checkObj(item.show)" class="s-bar-li" @tap="go(item.show.ur)">{{ item.show.tt }}</view>
		<view v-if="checkObj(item.tool)" class="s-bar-lis" @tap="go(item.tool.ur)">{{ item.tool.tt }}</view>
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
					index: {},
					list: {},
					show: {},
					tool: {}
				};
			}
		}
	}
};
</script>

<style></style>
