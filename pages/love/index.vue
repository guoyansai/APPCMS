<template>
	<div>
		喜欢的Love
		<button @click="getApi()">testApi</button>
		{{ tempData }}
	</div>
</template>

<script>
export default {
	data() {
		return {
			tempData: null
		};
	},
	methods: {
		getApi() {
			uni.request({
				url: 'http://localhost:89/api/?info/top//10', //检查更新的服务器地址
				data: {},
				success: res => {
					this.tempData = res.data.data.data;
					console.log('success', res);
				},
				fail: err => {
					console.log('err', err);
				},
				complete: result => {
					console.log('complete', result);
				}
			});
		}
	}
};
</script>

<style></style>
