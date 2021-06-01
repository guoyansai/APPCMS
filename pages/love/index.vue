<template>
	<view class="index-ok" v-if="saiCheckObj(dataLove)">
		<quick-menu v-if="quickMenu" @closemenu="closeMenu()"></quick-menu>
		<web-view v-if="dataLove.url" :src="dataLove.url"></web-view>
	</view>
</template>

<script>
	import mixinMain from "../../components/base/mixin-main.js";

	export default {
		mixins: [mixinMain],
		data() {
			return {
				dataLove: null,
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
