<template>
	<view class="index-ok">
		<quick-menu v-if="quickMenu" @closemenu="closeMenu()"></quick-menu>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import mixinMain from '../../components/base/mixin-main.js';

	export default {
		mixins: [mixinMain],
		data() {
			return {
				url: 'http://chat.780.pub/'
			};
		}
	};
</script>

<style></style>
