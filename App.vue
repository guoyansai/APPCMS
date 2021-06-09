<script>
	export default {
		onLaunch: function() {
			this.$asaidata.get("/app").then((res) => {
				this.$global.G.app = res;
				if (this.$global.G.app.ver !== this.$config.ver) {
					this.setTab(4);
				}
			});
			console.log("App Launch");
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

	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}
</style>
