<template>
	<view :class="'index-' + indexSn">
		<bar :item="topBar"></bar>
		<show v-if="viewSn || viewUr" :gsn="viewSn" :gur="viewUr" :gli="listSn" :gindex="indexObj" :glist="listObj"></show>
		<list v-else-if="listSn" :ppage="listPage" :psearch="listSearch" :gli="listSn" :gindex="indexObj" :glist="listObj"></list>
		<list v-else :ppage="listPage" :psearch="listSearch" :gindex="indexObj" :glist="listObj"></list>
		<button @tap="clear()">清空</button>
		{{indexObj}}-{{listObj}}
	</view>
</template>

<script>
import mixinMain from './mixin-main.js';

export default {
	mixins: [mixinMain]
};
</script>
