<template>
	<view class="index-ok" v-if="saiCheckObj(dataLove)">
		<web-view v-if="dataLove.url" :src="dataLove.url"></web-view>
	</view>
</template>

<script>
	import mixinMain from "../../components/base/mixin-main.js";
	import mixinMainLoad from '../../components/base/mixin-main-load.js';

	export default {
		mixins: [mixinMain, mixinMainLoad],
		data() {
			return {
				dataLove: {},
			};
		},
		onLoad: function(e) {
			this.initLove(0);
		},
		methods: {
			initLove(type = 0) {
				this.$asaidata
					.get("/love/li", type)
					.then((res) => {
						this.dataLove = res;
					});
			},
		},
	};
</script>

<style></style>
