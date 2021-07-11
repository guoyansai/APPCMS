<template>
	<view>
		<view class="ping-tu-area">
			<view class="item" :class="item.class" :style="[itemStyle,{'background-image': 'url('+url+')'}]"
				v-for="(item,index) in this.levelArray" :data-index="index" :key="index" @tap="change"></view>
		</view>
		<view><input type="text" v-model="url"></input></view>
		<view class="btn-group">
			<view class="cu-btn bg-green shadow" @tap="start">{{startText}}</view>
			<view class="cu-btn bg-green shadow" @tap="back">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level: 3,
				url: 'http://cdn.test.lfwellness.cn/pintu/xinpin.jpg',
				timeOut: -1,
				levelArray: [],
				startText: '开始游戏',
				gameStart: false,
				timeCounter: null,
			};
		},
		created() {
			let array = {};
			for (var i = 1; i <= this.level * this.level; i++) {
				array[i] = {
					value: i,
					class: 'pt_item_' + i
				};
			}
			this.levelArray = array;
		},
		computed: {
			itemStyle() {
				return {
					width: '33.333%',
					height: '100px',
				}
				let res = uni.getSystemInfoSync();
				let width = parseInt(res.windowWidth * 0.33);
				return {
					width: width + 'px',
					height: width + 'px',
				}
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: -1
				})
			},
			start() {
				let array = {};
				for (var i = 1; i <= this.level * this.level; i++) {
					array[i] = {
						value: i,
						class: 'pt_item_' + i
					};
				}
				array = this.rand(array);
				this.levelArray = array;
				this.gameStart = true;
				this.startText = '重新开始';
				clearInterval(this.timeCounter);
				if (this.timeOut != -1) {
					this.timeCounter = setTimeout(function() {
						uni.showToast({
							icon: 'none',
							title: '很遗憾！拼图失败了'
						})
						let array = {};
						for (var i = 1; i <= this.level * this.level; i++) {
							array[i] = {
								value: i,
								class: 'pt_item_' + i
							};
						}
						this.levelArray = array;
						this.$emit('result', 'failed');
					}, this.timeOut)
				}
			},
			//随机排序
			rand(arr) {
				let old_arr = {};
				old_arr = arr;
				let len = this.level * this.level;
				for (let i in arr) {
					if (len != i) {
						let idx = Math.ceil(Math.random() * (len - 1));
						let temp = arr[idx];
						arr[idx] = arr[i];
						arr[i] = temp;
					}
				}
				//逆序数验证
				let last = 0;
				let num = 0;
				for (let i in arr) {
					for (let j in arr) {
						if (j > i && arr[i].value > arr[j].value) {
							num++;
						}
					}
				}
				// console.log(num);
				if (num % 2 != 0) {
					arr = this.rand(old_arr)
				}
				return arr;
			},
			change(e) {
				let ele = e.currentTarget.dataset.index;
				let emptyNum = parseInt(this.level * this.level);
				if (this.gameStart && emptyNum != this.levelArray[ele].value) {
					let topNum = this.levelArray[ele - this.level] ? this.levelArray[ele - this.level].value : -1;
					let leftNum = this.levelArray[ele - 1] ? this.levelArray[ele - 1].value : -1;
					let rightNum = this.levelArray[parseInt(ele) + 1] ? this.levelArray[parseInt(ele) + 1].value : -1;
					let bottomNum = this.levelArray[parseInt(ele) + parseInt(this.level)] ? this.levelArray[parseInt(ele) +
							parseInt(this.level)]
						.value : -1;
					let temp = {};
					// console.log(topNum, leftNum, rightNum, bottomNum);
					switch (emptyNum) {
						case topNum: {
							temp = this.levelArray[ele];
							this.levelArray[ele] = this.levelArray[ele - this.level];
							this.levelArray[ele - this.level] = temp;
							break;
						}
						case leftNum: {
							if ((ele - 1) % 3 != 0) {
								temp = this.levelArray[ele];
								this.levelArray[ele] = this.levelArray[ele - 1];
								this.levelArray[ele - 1] = temp;
							}
							break;
						}
						case rightNum: {
							if (ele % 3 != 0) {
								temp = this.levelArray[ele];
								this.levelArray[ele] = this.levelArray[parseInt(ele) + 1];
								this.levelArray[parseInt(ele) + 1] = temp;
							}
							break;
						}
						case bottomNum: {
							temp = this.levelArray[ele];
							this.levelArray[ele] = this.levelArray[parseInt(ele) + parseInt(this.level)];
							this.levelArray[parseInt(ele) + parseInt(this.level)] = temp;
							break;
						}
					}

					//检查是否成功了
					if (this.isSuccess(this.levelArray)) {
						uni.showToast({
							icon: 'none',
							title: '恭喜！完成拼图'
						})
						this.gameStart = false;
						this.startText = '再玩一次';
						this.$emit('result', 'success');
					}
				}
			},
			isSuccess(arr) {
				console.log(arr);
				let temp = -1;
				for (let s in arr) {
					if (arr[s].value > temp) {
						temp = arr[s].value;
					} else {
						return false;
					}
				}
				return true;
			}
		}
	}
</script>

<style scoped>
	.ping-tu-area {
		width: 100%;
		margin-top: 10upx;
		margin: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.ping-tu-area .item {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-size: calc(300%) calc(300%);
		background-repeat: no-repeat;
		background-color: #C0C0C0;
		box-shadow: 0 10upx 10upx rgba(0, 0, 0, 0.1);
	}

	.pt_item_1 {
		background-position: left top;
	}

	.pt_item_2 {
		background-position: center top;
	}

	.pt_item_3 {
		background-position: right top;
	}

	.pt_item_4 {
		background-position: left center;
	}

	.pt_item_5 {
		background-position: center center;
	}

	.pt_item_6 {
		background-position: right center;
	}

	.pt_item_7 {
		background-position: left bottom;
	}

	.pt_item_8 {
		background-position: center bottom;
	}

	.pt_item_9 {
		background-position: right bottom;
		background-image: none !important;
	}

	.btn-group {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30upx;
	}
</style>
