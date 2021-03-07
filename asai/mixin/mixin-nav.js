export default {
	methods: {
		go(vUrl) {
			let goStr = vUrl;
			if (goStr && goStr.startsWith('?')) {
				goStr = 'main' + goStr;
			}
			this.goUrl(goStr);
		},
		goTab() {
			this.goUrl('index');
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
			this.bomb = {
				clearOn: !this.bomb.clearOn
			};
		}
	},
};
