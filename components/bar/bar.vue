<template>
	<view class="s-bar" v-if="saiCheckObj(item.list)">
		<view class="s-bar-li s-tap" open-type="switchTab" @tap="goTab()">{{ item.index.tt }}</view>
		<view v-if="saiCheckObj(item.list)" class="s-bar-li s-tap" @tap="go(item.list.ur)">{{ item.list.tt }}</view>
		<view v-if="saiCheckObj(item.show)" class="s-bar-li s-tap" @tap="go(item.show.ur)">{{ item.show.tt }}</view>
		<view v-if="saiCheckObj(item.tool)" class="s-bar-lis s-tap" @tap="go(item.tool.ur)">{{ item.tool.tt }}</view>
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
