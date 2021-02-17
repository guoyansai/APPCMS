export default {
	methods: {
		checkObj(obj) {
			if (typeof(obj) === 'object') {
				for (let key in obj) {
					return true;
				}
			}
			return false;
		},
	},
};
