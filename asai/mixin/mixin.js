import MixinAsai from './mixin-asai.js';
import MixinLocal from './mixin-local.js';
import MixinData from './mixin-data.js';
import MixinNet from './mixin-net.js';
import MixinNav from './mixin-nav.js';
import MixinComponents from './mixin-components.js';
import MixinGlobal from '../global/mixin-global.js';

export default {
	mixins: [MixinAsai, MixinLocal, MixinData, MixinNet, MixinNav, MixinComponents, MixinGlobal],
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
