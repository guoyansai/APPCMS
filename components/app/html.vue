<template>
	<web-view :src="`/hybrid/html/${htmlsrc.substr(4)}/index.html`"></web-view>
</template>
<script>
	export default {
		props: {
			htmlsrc: {
				type: String,
				required: true,
				default: 'html2048'
			}
		},
	}
</script>
