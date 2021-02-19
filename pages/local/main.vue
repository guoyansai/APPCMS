<template>
	<view class="index-web">
		<bar :item="dataLi.topBar"></bar>
		<show v-if="dataLi.viewSn" :sn="dataLi.viewSn" :item="dataLi.listObj"></show>
		<list v-else-if="dataLi.listSn" :item="dataLi.listObj" :li="dataLi.listSn"></list>
		<list v-else :item="dataLi.indexObj"></list>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.saiRead('').then(resIndex => {
			this.dataLi.indexObj = resIndex;
			console.log(666.123, this.dataLi.indexObj);
			this.saiRead(e.li).then(resList => {
				this.dataLi.listObj = resList;
				this.saiLoad(e);
			});
		});
	}
};
</script>

<style></style>
