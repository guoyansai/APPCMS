<template>
	<view class="s-area">
		<view class="s-index index-novel" v-if="saiCheckObj($config)">
			<view class="s-novel-li">
				<view class="label">标题：</view>
				<view class="form">
					<input type="text" v-model="novel.title" />
				</view>
			</view>
			<view class="s-novel-li">
				<view class="label">截稿：</view>
				<view class="form">
					<switch :checked="novel.over" @tap="checkOver()" />
				</view>
			</view>
			<view class="s-novel-li">
				<view class="label">内容：</view>
				<view class="form">
					<textarea class="textarea" v-model="novel.content"></textarea>
				</view>
			</view>
			<view class="s-novel-li">
				<view class="label">数据：</view>
				<view class="form">
					<textarea class="textarea" v-model="novel.data"></textarea>
				</view>
			</view>
			<view class="s-novel-li">
				<button @click="saveNovel()">保存为文件</button>
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
				novel: {
					title: '这是标题',
					content: '这是内容，这是内容，这是内容，这是内容.',
					data: '',
					over: false
				},
			};
		},
		methods: {
			checkOver() {
				this.novel.over = !this.novel.over;
			},
			saveNovel() {
				this.novel.data = '';
				this.novel.data = JSON.stringify(this.novel);
			}
		},
	};
</script>

<style scoped>
	.index-novel {
		border-color: #D8D8D8;
		border-width: 1rpx;
		border-bottom-width: 0;
		border-style: solid;
	}

	.s-novel-li {
		font-size: smaller;
		color: #666666;
		padding-top: 8px;
		padding-bottom: 8px;
		padding-left: 18px;
		padding-right: 18px;
		border-color: #D8D8D8;
		border-width: 0;
		border-bottom-width: 1px;
		border-style: solid;
		display: flex;
		align-items: center;
	}

	.s-novel-li .label {
		width: 88px;
	}

	.s-novel-li .form {
		flex-grow: 1;
	}

	.textarea {
		border-color: #D8D8D8;
		border-width: 1px;
		border-style: solid;
	}
</style>
