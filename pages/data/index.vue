<template>
	<view class="s-area">
		<view class="s-index index-data" v-if="saiCheckObj(dataMap)">
			<view class="s-data" @tap.stop="">
				<view class="s-data-main">
					<view class="s-data-lip" v-for="item in dataMap.map" :key="item.url">
						<view class="s-data-li s-data-p">
							<view class="s-data-tit" @tap="goQuick(item.url)">📚 {{item.tit}}</view>
							<view class="s-data-btn" @tap="downData(item.url)">{{showData(item.url)}}</view>
						</view>
						<template v-if="hasLocalData(item.url)">
							<view class="s-data-lic" v-for="itemChild in getChild(item.url)" :key="itemChild.url">
								<view class="s-data-li">
									<view class="s-data-tit" @tap="goQuickChild(item.url,itemChild.li,itemChild.ur)">
										📔 {{itemChild.tit}}
									</view>
									<view class="s-data-btn" @tap="downDataChild(itemChild.url)">
										{{showDataChild(itemChild.url)}}</view>
								</view>
							</view>
						</template>
					</view>
					<view class="s-data-li">🍁 敬请期待...</view>
				</view>
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
			getChild(url) {
				let tmpListChild = [];
				if (this.hasLocalData(url)) {
					const vSn = this.urlToSn(url);
					if (this.$global.G['data' + vSn].indexObj.li) {
						const keyArr = Object.keys(this.$global.G['data' + vSn].indexObj.li.dt);
						if (keyArr &&
							keyArr.length) {
							const snIndex = this.$global.G['data' + vSn].indexObj.db.dn.indexOf('sn');
							const urIndex = this.$global.G['data' + vSn].indexObj.db.dn.indexOf('ur');
							const ttIndex = this.$global.G['data' + vSn].indexObj.db.dn.indexOf('tt');
							if (urIndex > -1) {
								keyArr.forEach(item => {
									const urChild = this.$global.G['data' + vSn].indexObj.li.dt[item][urIndex];
									const ttChild = this.$global.G['data' + vSn].indexObj.li.dt[item][ttIndex];
									if (urChild && urChild.indexOf('://') < 0) {
										tmpListChild.push({
											tit: ttChild,
											url: '/' + vSn + '/co/' + urChild + '/' + item + '/co',
											li: item,
											ur: urChild
										});
									}
								});
							}
						}
					}
				}
				return tmpListChild;
			},
			goQuick(url) {
				if (url.startsWith('http')) {
					this.goHttp(url);
				} else {
					this.goUrl(url);
				}
			},
			goQuickChild(url, vLi, vUr) {
				const vUrl = `/pages/${this.urlToSn(url)}/main?li=${vLi}&ur=${vUr}`
				this.goQuick(vUrl);
			},
			urlToSn(url) {
				if (url.indexOf('/data') >= 0 || url.indexOf('/setting') >= 0) {
					return 'map';
				}
				return url.split('/')[2];
			},
			downData(url, type = 10) {
				const vSn = this.urlToSn(url);
				this.downDataChild("/" + vSn + "/li", type);
			},
			downDataChild(url, type = 10) {
				this.$asaidata
					.get(url, type)
					.then((res) => {
						this.goQuick('/pages/data/index');
					});
			},
			checkLocal(vSn) {
				return this.$global.G['data' + vSn] &&
					this.$global.G['data' + vSn].indexObj &&
					this.$global.G['data' + vSn].indexObj.ver;
			},
			hasLocalData(url) {
				const vSn = this.urlToSn(url);
				if (!this.checkLocal(vSn)) {
					this.$global.G['data' + vSn].indexObj = this.$asaidata.asaiStorageRead(`/${vSn}/li`);
				}
				return this.checkLocal(vSn);
			},
			showDataChild(url) {
				const objStorage = this.$asaidata.asaiStorageRead(url);
				if (objStorage && objStorage.ver) {
					return '🕝 最近更新:' + objStorage.ver || '';
				} else {
					return '⚡ 点击更新';
				}
			},
			showData(url) {
				if (this.hasLocalData(url)) {
					const vSn = this.urlToSn(url);
					return '🕒 最近更新:' + this.$global.G['data' + vSn].indexObj.ver || '';
				} else {
					return '⚡ 点击更新';
				}
			},
		}
	};
</script>

<style scoped>
	.s-data {}

	.s-data-main {
		border-color: #D8D8D8;
		border-style: solid;
		border-top-width: 0;
		border-bottom-width: 1rpx;
		border-left-width: 1rpx;
		border-right-width: 0;
	}

	.s-data-lip .s-data-p {
		background-color: #F5F5F5;
	}


	.s-data-li {
		display: flex;
		justify-content: space-around;
		padding-left: 18rpx;
		padding-right: 18rpx;
		padding-top: 18rpx;
		padding-bottom: 15rpx;
		border-color: #D8D8D8;
		border-top-width: 1rpx;
		border-bottom-width: 0;
		border-left-width: 0;
		border-right-width: 1rpx;
		border-style: solid;
	}

	.s-data-tit {
		flex-grow: 1;
	}

	.s-data-btn {
		display: inline-block;
		font-size: small;
		color: #999999;
		cursor: pointer;
	}

	.s-data-lic .s-data-tit {
		padding-left: 58rpx;
	}

	.s-data-lic .s-data-li {
		border-top-width: 0rpx;
	}
</style>
