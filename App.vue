<script>
import AsaiConstProvide from 'asai/const/const-provide.js';

export default {
	// globalData: Object.assign({}, AsaiConstProvide),
	provide() {
		return Object.assign({}, AsaiConstProvide);
	},
	onLaunch: function() {
		console.log('App Launch');
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show', this.globalData);
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
