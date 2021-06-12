<template>
	<view class="s-win" v-if="saiCheckObj(dataMap)">
		<view class="s-win-logo"><img class="s-win-img" src="static/ico/ico80.png">电子杂志</view>
		<view class="s-win-menu">
			<view class="s-win-go" :key="item.url" v-for="(item,index) in dataMap.map" @tap="go(item.url)">{{item.tit}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataMap: {}
			};
		},
		created: function() {
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
			goQuick(url) {
				if (url.startsWith('http')) {
					this.goHttp(url);
				} else {
					this.goTab(url);
				}
			},
		}
	};
</script>

<style scoped>
	.s-win {
		display: flex;
		height: 59px;
		border-bottom: #E8E8E8 1px solid;
		background-color: #FFFFFF;
	}

	.s-win-logo {
		width: 200px;
		text-align: center;
		line-height: 60px;
		display: flex;
		font-size: larger;
		font-weight: bold;
		justify-content: flex-start;
	}

	.s-win-img {
		height: 59px;
		margin-right: 10px;
	}

	.s-win-menu {
		flex-grow: 1;
		text-align: right;
		display: flex;
		justify-content: flex-end;
	}

	.s-win-go {
		cursor: pointer;
		width: 60px;
		height: 59px;
		line-height: 59px;
		text-align: center;
	}

	.s-win-go:hover {
		background-color: #E8E8E8;
	}
</style>
