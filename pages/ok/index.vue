<template>
	<view class="index-ok">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'http://chat.780.pub/'
			};
		}
	};
</script>

<style></style>
