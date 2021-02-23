<template>
	<g-base :ref="sn"></g-base>
</template>
<script>
export default {
	data() {
		return {
			sn: 'web'
		};
	},
	onLoad(e) {
		this.$nextTick(function() {
			this.$refs[this.sn].initStart(e, this.sn);
		});
	}
};
</script>
