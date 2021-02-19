<template>
	<view class="s-page">
		<view class="s-page-start" v-if="pgl > 7 && pgc > 4" @tap="setPage(1)">1</view>
		<view v-for="i in pgList" :key="'page' + i" :class="i + pgs - 1 === pgc ? 's-page-cur' : 's-page-li'" @tap="setPage(i + pgs - 1)">{{ i + pgs - 1 }}</view>
		<view class="s-page-end" v-if="pgc + 3 < pgl" @tap="setPage(pgl)">{{ pgl }}</view>
	</view>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			required: false
		},
		li: {
			type: String,
			required: false
		}
	},
	computed: {
		pgl() {
			return Math.ceil(this.item.pa / this.item.ps);
		},
		pgList() {
			return Math.min(this.pgl, 7);
		},
		pgc() {
			return Math.max(Math.min(this.item.pc, this.pgl), 1);
		},
		pgs() {
			if (this.pgl > this.pgList) {
				if (this.pgc > 3) {
					if (this.pgc + 4 > this.pgl) {
						return this.pgl - 6;
					} else {
						return this.pgc - 3;
					}
				} else {
					return 1;
				}
			} else {
				return 1;
			}
		}
	},
	methods: {
		setPage(vPage) {
			let vUrl = '?page=' + vPage;
			if (this.li) {
				vUrl = vUrl + '&li=' + this.li;
			}
			if (this.dataLi.listSearch.ss) {
				vUrl = vUrl + '&ss=' + this.dataLi.listSearch.ss;
			}
			if (this.dataLi.listSearch.ty) {
				vUrl = vUrl + '&ty=' + this.dataLi.listSearch.ty;
			}
			this.go(vUrl);
		}
	}
};
</script>

<style></style>
