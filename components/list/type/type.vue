<template>
	<view class="s-type">
		<view class="s-type-area">
			<view class="s-type-picker">
				<picker @change="bindPickerChange" :value="index" :range="typeArr" range-key="label">
					<view class="uni-input">{{ typeArr[index].label }}</view>
				</picker>
			</view>
			<view class="s-type-bugger">
				<picker @change="bindPickerChangeBugArr" :value="indexBug" :range="bugArr" range-key="label">
					<view class="uni-input">{{ bugArr[indexBug].label }}</view>
				</picker>
			</view>
		</view>
		<view v-if="listStr">{{ listStr }}</view>
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
			typeArr: [
				{ label: '默认列表', value: 'list' },
				{ label: '大图列表', value: 'list' },
				{ label: '小图列表', value: 'listmin' },
				{ label: '图片列表', value: 'pic' },
				{ label: '文本列表', value: 'txt' }
			],
			bugArr: [{ label: '默认调试', value: '' }, { label: '显示list', value: 'list' }, { label: '清空缓存', value: 'clear' }],
			index: 0,
			indexBug: 0,
			listStr: ''
		};
	},
	methods: {
		bindPickerChange(e) {
			if (e.detail.value) {
				this.index = e.detail.value;
				this.item.ty.li = this.typeArr[this.index].value;
			}
		},
		bindPickerChangeBugArr(e) {
			if (e.detail.value) {
				this.index = e.detail.value;
				let bugType = this.bugArr[this.index].value;
				if (bugType === 'list') {
					if (this.listStr) {
						this.listStr = '';
					} else {
						this.listStr = JSON.stringify(this.item);
					}
				} else if (bugType === 'clear') {
					this.clearOn = !this.clearOn;
					debugger
				}
			}
		}
	}
};
</script>

<style></style>
