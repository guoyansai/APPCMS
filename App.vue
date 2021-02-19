<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 2,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 4
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import url('/pages/css/global.css');
</style>
