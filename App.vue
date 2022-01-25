<script>
	export default {
		onLaunch: function() {
			this.$asaidata.get("/app", 1).then((res) => {
				this.$global.G.app = res;
				if (this.$global.G.app.ver !== this.$config.ver) {
					this.setTab(4);
				}
			});
			console.log("App Launch");
			console.log('%c 阿赛工作室 ',
				'font-size:28px;color:#DD0000;background-color:#ffD0ff;text-shadow:1px 2px 2px #888888;font-weight:bold;'
				);
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
		background-color: #FFFFFF !important;
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-page-head {
		box-shadow: 0 1rpx 1rpx #D8D8D8;
	}

	.uni-tabbar {
		box-shadow: 0 -1rpx 1rpx #D8D8D8;
	}
</style>
