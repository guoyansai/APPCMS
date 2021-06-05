<template>
	<view :class="'index-' + indexSn" v-if="canShow">
		<bar :item="topBar"></bar>
		<web-view v-if="viewUr" :src="viewUr"></web-view>
		<show v-else-if="viewSn" :gsn="viewSn" :gli="listSn" :gur="listUr" :psearch="listSearch" :gindex="indexCur" :glist="listCur">
		</show>
		<list v-else-if="listSn" :ppage="listPage" :gli="listSn" :gur="listUr" :psearch="listSearch" :gindex="indexCur"
			:glist="listCur"></list>
		<list v-else :ppage="listPage" :psearch="listSearch" :gindex="indexCur" :glist="listCur"></list>

	</view>
</template>

<script>
	import mixinMain from '../base/mixin-main.js';

	export default {
		mixins: [mixinMain],
		props: {
			gsn: {
				type: String,
				required: false,
				default: function() {
					return 'mags';
				}
			},
		},
		computed: {
			canShow() {
				if (this.viewUr) {
					return true;
				} else if (this.listCur.ver && this.indexCur.ver) {
					return true;
				} else if (this.indexCur.ver) {
					return true;
				}
				return true;
			}
		},
		methods: {
			initAsaiPage(e) {
				this.initOnLoad(e, this.gsn);
			}
		}
	};
</script>
