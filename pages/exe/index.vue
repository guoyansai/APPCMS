<template>
	<view class="index-exe">
		<bar :item="dataBar"></bar>
		<view>exe应用</view>
		<button @tap="get()">测试api</button>
		{{ testData }}
	</view>
</template>

<script>
export default {
	data() {
		return {
			testData: {}
		};
	},
	methods: {
		get() {
			this.saiApi().then(data => {
				this.testData = data[1].data;
				console.log(666.111, data);
			});
		}
	}
};
</script>

<style></style>
