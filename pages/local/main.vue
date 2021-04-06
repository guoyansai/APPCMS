<template>
	<view :class="'index-' + indexSn" v-if="canShow">
		<bar :item="topBar"></bar>
		<web-view v-if="viewUr" :src="viewUr"></web-view>
		<show v-else-if="viewSn" :gsn="viewSn" :gli="listSn" :psearch="listSearch" :gindex="indexCur" :glist="listCur"></show>
		<list v-else-if="listSn" :ppage="listPage" :gli="listSn" :psearch="listSearch" :gindex="indexCur" :glist="listCur"></list>
		<list v-else :ppage="listPage" :psearch="listSearch" :gindex="indexCur" :glist="listCur"></list>
	</view>
</template>

<script>
	import mixinMain from '../../components/base/mixin-main.js';

	export default {
		mixins: [mixinMain],
		onLoad: function(e) {
			this.initStart(e, 'local');
		},
	};
</script>
