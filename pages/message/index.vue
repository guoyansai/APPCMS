<template>
	<div>消息Message{{testData.member}}</div>
</template>

<script>
import test from '../../temp/test.json';

export default {
	data() {
		return {
			testData: {}
		};
	},
	created() {
		this.testData = test;
		console.log(666.111, test);
	}
};
</script>

<style></style>
