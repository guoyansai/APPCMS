<template>
	<view class="s-search">
		<view class="s-search-off" v-if="!searchStatus" @tap="searchStatus = true">≚</view>
		<view class="s-search-on" v-if="searchStatus" @tap="searchStatus = false">≙</view>
		<view class="s-search-show" v-if="searchStatus">
			<view class="s-search-picker">
				<picker @change="bindPickerChange" :value="index" :range="item.ds" range-key="tt">
					<view class="uni-input">{{ item.ds.length && item.ds[item.ty].tt }}</view>
				</picker>
			</view>
			<view class="s-search-input"><input placeholder="请输入关键词" v-model="searchStr" @confirm="goSearch()" /></view>
			<view class="s-search-button"><button class="mini-btn" type="primary" size="mini"
					@tap="goSearch()">搜索</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				required: false
			},
			gli: {
				type: String,
				required: false
			},
			gur: {
				type: String,
				required: false
			}
		},
		data() {
			return {
				index: 0,
				searchStatus: true,
				searchStr: this.item.ss,
			};
		},
		methods: {
			bindPickerChange(e) {
				if (e.detail.value) {
					this.index = e.detail.value;
					this.item.ty = this.index;
				}
			},
			goSearch() {
				if (this.item.ss || this.searchStr) {
					if (this.searchStr) {
						this.item.ss = this.searchStr;
					}
					let vUrl = '?ss=' + this.saiEncode(this.item.ss);
					if (this.item.ty) {
						vUrl = vUrl + '&ty=' + this.item.ty;
					}
					if (this.gli) {
						vUrl = vUrl + '&li=' + this.gli;
					}
					if (this.gur) {
						vUrl = vUrl + '&ur=' + this.gur;
					}
					this.go(vUrl);
				}
			}
		}
	};
</script>

<style></style>
