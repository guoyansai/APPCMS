<template>
	<view class="s-area">
		<view class="s-index" :class="'index-' + indexSn" v-if="canShow">
			<bar :item="topBar"></bar>
			<web-view v-if="viewUr" :src="viewUr"></web-view>
			<show v-else-if="viewSn" :gsn="viewSn" :gli="listSn" :gur="listUr" :psearch="listSearch" :gindex="indexCur" :glist="listCur">
			</show>
			<list v-else-if="listSn" :ppage="listPage" :gli="listSn" :gur="listUr" :psearch="listSearch"
				:gindex="indexCur" :glist="listCur" :apiUrl="apiUrl"></list>
			<list v-else :ppage="listPage" :psearch="listSearch" :gindex="indexCur" :glist="listCur" :apiUrl="apiUrl">
			</list>
		</view>
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
			reloadData() {
				this.$asaidata
					.get(this.apiUrl, 1)
					.then((res) => {
						uni.showToast({
							title: '更新成功',
							duration: 2000
						});
						uni.stopPullDownRefresh();
						this.goUrl('/pages/' + this.indexSn + '/index');
					});
			},
			initAsaiPage(e) {
				this.initOnLoad(e, this.gsn);
			}
		}
	};
</script>
