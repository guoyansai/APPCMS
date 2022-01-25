<template>
	<view class="s-ver">
		<view v-if="+$global.G.app.ver > +$config.ver" @tap="downNewVer()" class="s-ver-con s-red">
			点击下载最新版：{{ $global.G.app.ver }}
		</view>
		<view v-if="!$global.G.app.ver" @tap="initVer()" class="s-ver-con">检验更新</view>
	</view>
</template>

<script>
	export default {
		methods: {
			initVer(type = 1) {
				this.$asaidata
					.get("/app", type)
					.then((res) => {
						this.$global.G.app = res;
						if (this.$global.G.app.ver !== this.$config.ver) {
							this.setTab(4);
						}
						this.goFresh();
					});
			},
			downNewVer() {
				this.goHttp(this.$global.G.app.app);
			},
		},
	}
</script>

<style scoped>
	.s-ver {
		text-align: center;
	}

	.s-ver-con {
		display: inline-block;
		cursor: pointer;
		margin-top: 28rpx;
		border-radius: 28rpx;
		border-style: solid;
		border-width: 1rpx;
		border-color: #EEEEE8;
		padding-top: 28rpx;
		padding-bottom: 28rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;
		box-shadow: #DDDDD8 1rpx 2rpx 16rpx;
	}
</style>
