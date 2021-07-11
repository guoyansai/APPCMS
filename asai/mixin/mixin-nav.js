export default {
	methods: {
		loadShow(obj) {
			if (!this.Loader) {
				this.Loader = true;
				uni.showLoading({
					title: obj.title
				});
			}
		},
		loadClose() {
			if (this.Loader) {
				this.Loader = false;
				uni.hideLoading();
			}
		},
		isOnePages(vUrl) {
			let isOne = false;
			this.$config.onePages.forEach(item => {
				if (!isOne) {
					if (vUrl.includes(item)) {
						isOne = true;
					}
				}
			});
			return isOne;
		},
		go(vUrl) {
			let goStr = vUrl;
			if (goStr && goStr.startsWith('?')) {
				if (this.isOnePages(goStr)) {
					goStr = 'index' + goStr;
				} else {
					goStr = 'main' + goStr;
				}
			}
			this.goUrl(goStr);
		},
		goFresh() {
			uni.reLaunch({
				url: this.$route.fullPath,
				fail: (err) => {
					this.goTab();
				}
			});
		},
		goTab(vUrl = '') {
			let urls = vUrl || 'index'
			uni.switchTab({
				url: urls,
				fail: (err7) => {
					uni.reLaunch({
						url: this.$route.fullPath,
						fail: (err8) => {
							uni.switchTab({
								url: this.$route.fullPath,
								fail: (err9) => {
									this.goTab();
								}
							});
						}
					});
				}
			});
		},
		goUrl(goStr) {
			uni.navigateTo({
				url: goStr,
				animationType: 'fade-in',
				animationDuration: 180,
				fail: (err) => {
					uni.reLaunch({
						url: goStr,
						fail: (err2) => {
							uni.switchTab({
								url: goStr,
								fail: (err3) => {
									uni.redirectTo({
										url: goStr
									});
								}
							});
						}
					});
				}
			});
		},
		getDir() {
			let routes = getCurrentPages();
			let curRoute = routes[0].route;
			if (routes.length) {
				curRoute = routes[routes.length - 1].route;
			}
			return curRoute;
		},
		doClearOn() {
			this.$global.G.bomb = {
				clearOn: !this.$global.G.bomb.clearOn
			};
		},
		goHttp(vHttp) {
			try {
				plus.runtime.openURL(vHttp, function(res) {
					console.log(res);
				});
			} catch (e) {
				console.log(e);
				window.location.href = vHttp;
			}
		},
		setTab(index, text = '') {
			if (text && index) {
				uni.setTabBarBadge({
					index: index,
					text: text,
				});
			} else if (index) {
				uni.showTabBarRedDot({
					index: index,
				});

			}
		},
	},
};
