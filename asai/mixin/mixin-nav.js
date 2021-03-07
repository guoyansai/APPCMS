export default {
	methods: {
		go(vUrl) {
			let goStr = vUrl;
			if (goStr && goStr.startsWith('?')) {
				goStr = 'main' + goStr;
			}
			uni.navigateTo({
				url: goStr,
				animationType: 'zoom-fade-out',
				animationDuration: 200,
				success: (res) => {

				},
				fail: (err) => {
					console.log(666.321, err)
					uni.redirectTo({
						url: goStr
					});
					uni.reLaunch({
						url: goStr
					});
				}
			});
		},
		goTab() {
			console.log(666.234)
			uni.switchTab({
				url: 'index'
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
	},
};
