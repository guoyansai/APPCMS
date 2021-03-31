<template>
	<view class="s-type">
		<view class="s-fast">
			<view class="s-fast-left">
				<picker @change="bindPickerChange" :value="index" :range="typeArr" range-key="label">
					<view :key="index" class="uni-input">{{ typeArr[index].label }}</view>
				</picker>
			</view>
			<view class="s-fast-right">
				<picker @change="doCmd" :value="indexBug" :range="bugArr" range-key="label">
					<view :key="indexBug" class="uni-input">{{ bugArr[indexBug].label }}</view>
				</picker>
				<!-- <input class="s-fast-input" type="text" placeholder-style="text-align:right" placeholder="输入命令" v-model="cmdStr" @confirm="doCmd" /> -->
			</view>
		</view>
		<view v-if="reportStr">{{ reportStr }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				required: false
			}
		},
		data() {
			return {
				typeArr: [{
						label: '列表样式',
						value: ''
					},
					{
						label: '大图列表',
						value: 'list'
					},
					{
						label: '全部显示',
						value: 'listmax'
					},
					{
						label: '小图列表',
						value: 'listmin'
					},
					{
						label: '图片列表',
						value: 'pic'
					},
					{
						label: '文本列表',
						value: 'txt'
					}
				],
				bugArr: [{
						label: '选择命令',
						value: ''
					}, {
						label: '显示数据',
						value: 'show'
					},
					{
						label: '隐藏数据',
						value: 'close'
					},
					{
						label: '清空数据',
						value: 'clear'
					}
				],
				index: 0,
				indexBug: 0,
				reportStr: '',
				cmdStr: ''
			};
		},
		methods: {
			bindPickerChange(e) {
				if (e.detail.value) {
					this.index = e.detail.value;
					this.item.ty.li = this.typeArr[this.index].value;
				}
			},
			doCmd(e) {
				if (e.detail.value) {
					this.indexBug = e.detail.value;
					let bugType = this.bugArr[this.indexBug].value;;
					if (bugType === 'show') {
						this.reportStr = JSON.stringify(this.item);
					} else if (bugType === 'close') {
						this.reportStr = '';
					} else if (bugType === 'clear') {
						this.indexBug = 0;
						uni.$emit('clear', 'doing');
					}
				}
			}
		}
	};
</script>

<style></style>
