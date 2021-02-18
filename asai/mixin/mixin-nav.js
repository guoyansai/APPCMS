export default {
	methods: {
		go(vUrl) {
			let goStr = vUrl;
			if (goStr.startsWith('?')) {
				goStr = 'index' + goStr;
			}
			uni.navigateTo({
				url: goStr
			});
			// uni.redirectTo({
			// 	url: goStr
			// });
			// uni.reLaunch({
			// 	url: goStr
			// });
			// uni.switchTab({
			// 	url: goStr
			// });
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
