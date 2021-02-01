<template>
	<div>
		首页Index{{ dataLi }}{{ dataLi.aaaa }}
		<input type="text" v-model="dataLi.aaaa" />
		{{ dataLi.bbbb }}
		<input type="text" v-model="dataLi.bbbb" />
		{{ aa }}
		<input type="text" v-model="aa" />
		{{ dataSs }}
		<input type="text" v-model="dataSs" />
		<button @click="isPage('pages/home/index-test.vue')">测试</button>
		<component :is="isPage('pages/home/index-test')"></component>
	</div>
</template>

<script>
export default {
	data() {
		return {
			aa: '222',
		};
	},
	mounted() {
		console.log(666.789, this.saiRead('test'));
	},
	methods: {
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
