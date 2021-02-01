<template>
	<div>
		首页Index{{ dataLi }}{{ dataLi.aaaa }}
		<input type="text" v-model="dataLi.aaaa" />
		{{ dataLi.bbbb }}
		<input type="text" v-model="dataLi.bbbb" />
		{{ aa }}
		<input type="text" v-model="aa" />
		{{ li.aaaa }}
		<input type="text" v-model="li.aaaa" />
		{{ dataSs }}
		<input type="text" v-model="dataSs" />
		<button @click="isPage('./index-test.vue')">测试</button>
		<component :is="isPage('./index-test.vue')"></component>
	</div>
</template>

<script>
export default {
	data() {
		return {
			aa: '222',
			li: this.$common.dataLi
		};
	},
	mounted() {
		console.log(666.789, this.$common.saiRead('test'));
	},
	methods: {
		isPage(file) {
			return require('' + file + '').default;
		},
		test() {
			this.dataLi.aaaa = 'hhh789hhh';
			console.log(666.585, this.dataLi.aaaa);
		}
	}
};
</script>

<style>
input {
	border: 2px solid #dd0000;
}
</style>
