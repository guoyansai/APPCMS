import MixinData from './mixin-data.js';

export default {
	mixins: [MixinData],
	data() {
		return {
			dataLi: this.$global.dataLi,
			dataCo: this.$global.dataCo,
			dataRd: this.$global.dataRd,
			dataSs: this.$global.dataSs,
		};
	},
	methods: {
		isPage(file) {
			let fileName = file;
			if (!fileName.endsWith('.vue')) {
				fileName = fileName + '.vue';
			}
			return require('../../' + fileName + '').default;
		},
	},
}
