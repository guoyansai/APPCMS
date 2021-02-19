<template>
	<view class="index-exe">
		<bar :item="barData"></bar>
		<view>exe应用</view>
		<button @tap="del()">清空缓存{{ delTime }}</button>
		<button @tap="get()">测试api</button>
		{{ testData }}
	</view>
</template>

<script>
export default {
	data() {
		return {
			testData: '',
			delTime: '',
			barData: {}
		};
	},
	methods: {
		get() {
			this.saiApi('', 0).then(data => {
				this.testData = JSON.stringify(data);
				console.log(666.111, data);
			});
		},
		del() {
			this.delTime = Date.now();
			this.saiDel();
		}
	}
};
</script>

<style></style>
