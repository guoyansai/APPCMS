<template>
	<view class="index-local">
		<bar :item="dataBar"></bar>
		<show v-if="dataSn" :sn="dataSn" :item="dataList"></show>
		<list v-else-if="dataLi" :item="dataList" :li="dataLi"></list>
		<list v-else :item="dataIndex"></list>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.saiLoad(e, 1);
	}
};
</script>

<style></style>
