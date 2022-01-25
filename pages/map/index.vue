<template>
	<view class="s-area">
		<view class="s-index index-map" v-if="saiCheckObj(dataMap)">
			<view class="s-menu" @tap.stop="">
				<view :style="ranColor()" class="s-menu-main">
					<view :style="ranColor()" class="s-menu-li" v-for="item in dataMap.map" @tap="goQuick(item.url)"
						:key="item.tit">
						{{item.tit}}
					</view>
					<view :style="ranColor()" class="s-menu-li">敬请期待...</view>
				</view>
			</view>
			<update></update>
		</view>
	</view>
</template>

<script>
	import {
		RandomBgColor
	} from '../../asai/js/random-color.js';
	import update from '../../components/update/update.vue';

	export default {
		data() {
			return {
				dataMap: {}
			};
		},
		components: {
			update
		},
		onLoad: function(e) {
			this.initMap(0);
		},
		methods: {
			initMap(type = 0) {
				this.$asaidata
					.get("/map/li", type)
					.then((res) => {
						this.dataMap = res;
					});
			},
			ranColor() {
				return 'background-color:' + RandomBgColor() + '';
			},
			goQuick(url) {
				if (url.startsWith('http')) {
					this.goHttp(url);
				} else {
					this.goUrl(url);
				}
			},
		}
	};
</script>

<style scoped>
	.index-map {
		height: 100%;
		width: 100%;
	}

	.s-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.s-menu-main {
		border-radius: 28rpx;
		border-style: solid;
		border-width: 1rpx;
		border-color: #EEEEE8;
		padding-top: 28rpx;
		padding-bottom: 28rpx;
		box-shadow: #DDDDD8 1rpx 2rpx 16rpx;
		width: 100%;
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fill, 200rpx);
	}

	.s-menu-li {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rpx;
		font-size: smaller;
		cursor: pointer;
		height: 88rpx;
		line-height: 88rpx;
	}
</style>
