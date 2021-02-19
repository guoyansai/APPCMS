<template>
	<view class="index-web">
		<bar :item="dataLi.topBar"></bar>
		<list :item="dataLi.indexObj"></list>{{dataLi.indexObj}}
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.saiRead('').then(res => {
			this.dataLi.indexObj = res;
			console.log(666.123,this.dataLi.indexObj)
			this.saiLoad(e);
		});
	}
};
</script>

<style></style>
