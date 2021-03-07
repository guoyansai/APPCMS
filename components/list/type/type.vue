<template>
	<view class="s-type">
		<view class="s-fast">
			<view class="s-fast-left">
				<picker @change="bindPickerChange" :value="index" :range="typeArr" range-key="label">
					<view :key="'ctype' + index" class="uni-input">{{ typeArr[index].label }}</view>
				</picker>
			</view>
			<view class="s-fast-right"><input class="s-fast-input" type="text" placeholder-style="text-align:right" placeholder="输入命令" v-model="cmdStr" @confirm="doCmd" /></view>
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
			typeArr: [
				{ label: '默认列表', value: 'list' },
				{ label: '大图列表', value: 'list' },
				{ label: '小图列表', value: 'listmin' },
				{ label: '图片列表', value: 'pic' },
				{ label: '文本列表', value: 'txt' }
			],
			index: 0,
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
				let bugType = e.detail.value;
				if (bugType === 'show') {
					this.reportStr = JSON.stringify(this.item);
				} else if (bugType === 'close') {
					this.reportStr = '';
				} else if (bugType === 'clear') {
					uni.$emit('clear', 'doing');
				}
			}
		}
	}
};
</script>

<style></style>
