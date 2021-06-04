<template>
	<asaipage gsn="tools" ref="asaipage"></asaipage>
</template>

<script>
	import asaipage from '../../components/asaipage/asaipage.vue';
	import mixinAsaipage from '../../components/asaipage/mixin-asaipage.js';

	export default {
		mixins: [mixinAsaipage]
	}
</script>
