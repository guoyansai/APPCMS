<template>
	<view class="s-menu-area" @tap="closeMenu()">
		<view class="s-menu" @tap.stop="">
			<view class="s-menu-tit">导航</view>
			<view :style="ranColor()" class="s-menu-main">
				<view :style="ranColor()" class="s-menu-li" v-for="item in quickMenus" @tap="goQuick(item.url)">
					{{item.tit}}
				</view>
				<view :style="ranColor()" class="s-menu-li">+</view>
			</view>
			<view class="s-menu-edit">edit</view>
		</view>
	</view>
</template>

<script>
	import {
		RandomBgColor
	} from '../../asai/js/random-color.js';
	export default {
		data() {
			return {
				quickMenus: [{
					tit: "网址",
					url: "/pages/mags/index"
				}, {
					tit: "专题",
					url: "/pages/tools/index"
				}, {
					tit: "聊吧",
					url: "/pages/love/index"
				}, {
					tit: "应用",
					url: "/pages/others/index"
				}, {
					tit: "我的",
					url: "/pages/user/index"
				}, {
					tit: "试试6",
					url: "http://www.baidu.com/"
				}, {
					tit: "试试7",
					url: "http://www.baidu.com/"
				}, {
					tit: "试试8",
					url: "http://www.baidu.com/"
				}]
			};
		},
		methods: {
			ranColor() {
				return 'background-color:' + RandomBgColor() + '';
			},
			goQuick(url) {
				if (url.startsWith('http')) {
					this.goHttp(url);
				} else {
					this.goTab(url);
				}
				console.log(666.111, url);
			},
			closeMenu() {
				this.$emit('closemenu');
			},
		}
	};
</script>

<style></style>
