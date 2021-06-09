<template>
	<view class="s-area">
		<view class="s-index index-setting" v-if="saiCheckObj($config)">
			<view class="s-setting-li">
				<view class="label">切换线路：</view>
				<picker @change="bindPickerChange" :value="index" :range="lineTypes" range-key="index">
					<view class="uni-input">{{$config.dev}}</view>
				</picker>
			</view>
			<view class="s-setting-li">
				<view class="label">自备线路：</view>
				<view class="form">
					<input type="text" v-model="$config.baseURL.user" />
				</view>
			</view>
			<view class="s-setting-li">
				<view class="label">缓存标识：</view>
				<view class="form">
					<input type="text" v-model="$config.name.app.endsWith" />
				</view>
			</view>
			<view class="s-setting-li">
				<view class="label">是否缓存：</view>
				<view class="form">
					<switch :checked="$config.auto.saveLocal" @tap="checkLocal()" />
				</view>
			</view>
			<view class="s-setting-li">
				<view class="label">智能更新：</view>
				<view class="form">
					<switch :checked="$config.auto.apiVerload" @tap="checkVer()" />
				</view>
			</view>
			<view class="s-setting-li">
				<view class="label">联网模式：</view>
				<view class="form">
					<switch :checked="$config.auto.api" @tap="checkApi()" />
				</view>
			</view>
			<view class="s-setting-li">
				<view class="label">当前版本：</view>
				<view class="form">
					{{ $config.ver }}
				</view>
			</view>
			<view class="s-setting-li" v-if="hasNewVer">
				<view class="label">有新版本：</view>
				<view class="form s-setting-new">
					{{ $global.G.app.ver }} [ <span @tap="downNewVer()">更新</span> ]
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixinMain from "../../components/base/mixin-main.js";
	import mixinMainLoad from '../../components/base/mixin-main-load.js';

	export default {
		mixins: [mixinMain, mixinMainLoad],
		data() {
			return {
				index: 0,
				hasNewVer: false,
				lineTypes: [],
			};
		},
		onLoad: function(e) {
			this.lineTypes = Object.keys(this.$config.baseURL);
			if (this.$global.G.app.ver !== this.$config.ver) {
				this.hasNewVer = true;
			}
		},
		methods: {
			bindPickerChange(e) {
				if (e.detail.value) {
					this.index = e.detail.value;
					this.$config.dev = this.index;
				}
			},
			checkLocal() {
				this.$config.auto.saveLocal = !this.$config.auto.saveLocal;
			},
			checkVer() {
				this.$config.auto.apiVerload = !this.$config.auto.apiVerload;
			},
			checkApi() {
				this.$config.auto.api = !this.$config.auto.api;
			},
			downNewVer() {
				this.goHttp(this.$global.G.app.app);
			},
		},
	};
</script>

<style>
	.s-setting-li {
		font-size: smaller;
		color: #666666;
		padding-top: 8px;
		padding-bottom: 8px;
		padding-left: 8px;
		padding-right: 8px;
		margin-left: 8px;
		margin-right: 8px;
		border-color: #D8D8D8;
		border-width: 0;
		border-bottom-width: 1px;
		border-style: solid;
		display: flex;
	}

	.s-setting-li .label {
		width: 88px;
	}

	.s-setting-li .form {
		flex-grow: 1;
	}

	.s-setting-new {
		color: #DD0000;
	}
</style>
