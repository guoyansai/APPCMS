<script>
	export default {
		onLaunch: function() {
			this.$asaidata.get("/app").then((res) => {
				this.$global.G.app = res;
			});
			console.log("App Launch");
			setTimeout(() => {
				uni.setTabBarBadge({
					index: 2,
					text: "31",
				});
				uni.showTabBarRedDot({
					index: 4,
				});
			}, 1000);
		},
		onShow: function() {
			console.log("App Show");
		},
		onHide: function() {
			console.log("App Hide");
		},
	};
</script>

<style>
	/*每个页面公共css */
	@import url("/static/css/global.css");
</style>
