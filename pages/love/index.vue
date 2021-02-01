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
	onLoad() {
		uni.getStorage({
			key: 'testapp',
			success: function(res) {
				this.tempData = res.data;
				console.log(res.data);
			}
		});
	},
	methods: {
		getApi() {
			uni.request({
				url: 'http://780.pub/test.json', //检查更新的服务器地址
				data: {},
				success: res => {
					this.tempData = res;
					uni.setStorage({
						key: 'testapp',
						data: this.tempData,
						success: function() {
							console.log('success', res);
						}
					});
				},
				fail: err => {
					console.log('err', err);
				},
				complete: result => {
					console.log('complete', result);
				}
			});
		},
		delApp() {
			uni.removeStorage({
				key: 'testapp',
				success: function(res) {
					console.log('success');
				}
			});
		}
	}
};
</script>

<style></style>
