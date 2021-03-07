<template>
	<view :class="'index-' + indexSn" v-if="canShow">
		<bar :item="topBar"></bar>
		<web-view v-if="viewUr" :src="viewUr"></web-view>
		<show v-else-if="viewSn" :gsn="viewSn" :gli="listSn" :psearch="listSearch" :gindex="indexObj" :glist="listObj"></show>
		<list v-else-if="listSn" :ppage="listPage" :gli="listSn" :psearch="listSearch" :gindex="indexObj" :glist="listObj"></list>
		<list v-else :ppage="listPage" :psearch="listSearch" :gindex="indexObj" :glist="listObj"></list>
		<view v-if="clearOn"><button @tap="clear()">清空</button></view>
	</view>
</template>

<script>
import mixinMain from '../../components/base/mixin-main.js';

export default {
	mixins: [mixinMain],
	onLoad(e) {
		this.initStart(e, 'exe');
	}
};
</script>
