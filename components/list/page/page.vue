<template>
	<view v-if="pgList>1" class="s-page">
		<view class="s-page-start" v-if="pgl > 7 && pgc > 4" @tap="setPage(1)">1</view>
		<view v-for="i in pgList" :key="i" :class="i + pgs - 1 === pgc ? 's-page-cur' : 's-page-li'"
			@tap="setPage(i + pgs - 1)">{{ i + pgs - 1 }}</view>
		<view class="s-page-end" v-if="pgc + 3 < pgl" @tap="setPage(pgl)">{{ pgl }}</view>
		<input class="s-page-input" type="text" placeholder="数量" :value="item.ps" @confirm="setPs" />
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				required: false
			},
			psearch: {
				type: Object,
				required: false,
				default: function() {
					return {
						dr: {},
						ds: [],
						cl: '',
						ty: 0,
						ss: ''
					};
				}
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
			setPs(e) {
				this.item.ps = e.detail.value;
				let vUrl = this.getPageUrl(1);
				if (this.item.ps) {
					vUrl = vUrl + '&pagesize=' + this.item.ps;
				}
				this.go(vUrl);
			},
			setPage(vPage) {
				this.go(this.getPageUrl(vPage));
			},
			getPageUrl(vPage) {
				let vUrl = '?page=' + vPage;
				vUrl = '?page=' + vPage;
				if (this.gli) {
					vUrl = vUrl + '&li=' + this.gli;
				}
				if (this.gur) {
					vUrl = vUrl + '&ur=' + this.gur;
				}
				if (this.psearch.ss) {
					vUrl = vUrl + '&ss=' + this.saiEncode(this.psearch.ss);
				}
				if (this.psearch.ty) {
					vUrl = vUrl + '&ty=' + this.psearch.ty;
				}
				return vUrl;
			}
		}
	};
</script>

<style></style>
